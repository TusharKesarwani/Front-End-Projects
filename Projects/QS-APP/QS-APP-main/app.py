from datetime import datetime
from itertools import islice
import statistics as st
from flask import Flask, redirect, url_for, flash
from flask import render_template
from flask import request
from flask_sqlalchemy import SQLAlchemy
import bcrypt
import matplotlib
import matplotlib.patheffects as path_effects

matplotlib.use("Agg")
from matplotlib import pyplot as plt

# <--------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///refinaldb0.sqlite3"
app.secret_key = "SuperSecretKey"
db = SQLAlchemy()
db.init_app(app)
app.app_context().push()
# <--------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
class UCred(db.Model):
    __tablename__ = "User_Credentials"
    user_id = db.Column(
        db.Integer, autoincrement=True, primary_key=True, nullable=False, unique=True
    )
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)


class Tracker(db.Model):
    __tablename__ = "Tracker"
    tr_id = db.Column(
        db.Integer, autoincrement=True, primary_key=True, nullable=False, unique=True
    )
    ur_id = db.Column(
        db.Integer, db.ForeignKey("User_Credentials.user_id"), nullable=False
    )
    tr_name = db.Column(db.String, nullable=False)
    desc = db.Column(db.String, nullable=False)


class TrackedLogs(db.Model):
    __tablename__ = "Tracked_Logs"
    l_id = db.Column(
        db.Integer, autoincrement=True, primary_key=True, nullable=False, unique=True
    )
    t_id = db.Column(db.Integer, db.ForeignKey("Tracker.tr_id"), nullable=False)
    logval = db.Column(db.Integer, nullable=False)
    note = db.Column(db.String, nullable=True)
    date = db.Column(db.Date, nullable=False)


db.create_all()
db.session.commit()
# <--------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "GET":
        return render_template("sign-up.html")

    if request.method == "POST":
        formdat = list(request.form.values())
        unamecheck = UCred.query.filter(UCred.username == formdat[0]).first()
        if unamecheck:
            flash("Username already taken! ಥ_ಥ")
            return redirect(url_for("signup"))
        elif formdat[3] != formdat[4]:
            flash("Password don't match! (´。＿。｀)")
            return redirect(url_for("signup"))
        else:
            passhash = bcrypt.hashpw(formdat[3].encode("utf-8"), bcrypt.gensalt())
            new_cred = UCred(
                username=formdat[0],
                password=passhash,
                fname=formdat[1],
                lname=formdat[2],
            )
            db.session.add(new_cred)
            db.session.commit()
            flash("Signed Up Successfully!")
            return redirect(url_for("signup"))


@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")

    if request.method == "POST":
        formdat = list(request.form.values())

        c_user = UCred.query.filter(UCred.username == formdat[0].rstrip()).first()
        if c_user:
            if bcrypt.checkpw(formdat[1].encode("utf-8"), c_user.password):
                flash("Logged in Successfully!")
                return redirect(url_for("index", uid=c_user.user_id))
            else:
                flash("Incorrect Password")
                return redirect(url_for("login"))
        else:
            flash("User not Found")
            return redirect(url_for("login"))


@app.route("/editprofile/<int:uid>", methods=["GET", "POST"])
def edit(uid):
    if request.method == "GET":
        c_user = UCred.query.filter_by(user_id=uid).first()
        return render_template("edit_profile.html", c_user=c_user)

    if request.method == "POST":
        c_user = UCred.query.filter_by(user_id=uid).first()
        lu = UCred.query.filter(UCred.username == c_user.username)
        formdat = list(request.form.values())
        lulist = [u.username for u in lu]

        if len(lulist) > 1:
            flash("Username already taken! ಥ_ಥ")
            return redirect(url_for("edit_profile.html", c_user=c_user))
        elif (len(lulist) == 1) and (formdat[3] == formdat[4]):
            passhash = bcrypt.hashpw(formdat[3].encode("utf-8"), bcrypt.gensalt())
            (c_user.username, c_user.fname, c_user.lname, c_user.password) = (
                formdat[0],
                formdat[1],
                formdat[2],
                passhash,
            )
            db.session.commit()
            flash("Changes Saved!")
            return render_template("edit_profile.html", c_user=c_user)


@app.route("/index/<int:uid>", methods=["GET", "POST"])
def index(uid):
    if request.method == "GET":
        c_user = UCred.query.filter_by(user_id=uid).first()
        trl = Tracker.query.filter_by(ur_id=uid)
        tlist = [tracker.tr_id for tracker in trl]
        tplist = [(tracker.tr_id, tracker.tr_name) for tracker in trl]
        logs = (
            TrackedLogs.query.filter(TrackedLogs.t_id.in_(tlist))
            .order_by(TrackedLogs.date.desc())
            .limit(8)
            .all()
        )
        loglist = []
        for log in logs:
            for tp in tplist:
                if log.t_id == tp[0]:
                    loglist.append((tp[1], log.logval, log.date, log.note, tp[0]))
        return render_template(
            "index.html", uid=uid, loglist=loglist, trackers=trl, uname=c_user.fname
        )


@app.route("/tracker/<int:uid>/<int:tracker_id>", methods=["GET", "POST"])
def display_tracker(tracker_id, uid):
    if request.method == "GET":
        c_user = UCred.query.filter_by(user_id=uid).first()
        trl = Tracker.query.filter_by(ur_id=uid)
        ctr = Tracker.query.filter_by(tr_id=tracker_id).first()
        logs = TrackedLogs.query.filter(TrackedLogs.t_id == tracker_id).order_by(
            TrackedLogs.date.asc()
        )
        return render_template(
            "DisplayTracker.html",
            tracker=ctr,
            uid=uid,
            uname=c_user.fname,
            logs=logs,
            trackers=trl,
            line=visualisationline(tracker_id, logs),
            bar=visualisationbar(tracker_id, logs),
        )

    if request.method == "POST":
        formdat = list(request.form.values())
        new_log = TrackedLogs(
            t_id=tracker_id,
            logval=formdat[1],
            note=formdat[2],
            date=datetime.strptime(formdat[0], "%Y-%m-%d"),
        )
        db.session.add(new_log)
        db.session.commit()
        return redirect(url_for("display_tracker", uid=uid, tracker_id=tracker_id))


@app.route("/tracker/create/<int:uid>", methods=["GET", "POST"])
def add_tracker(uid):
    if request.method == "GET":
        trl = Tracker.query.filter_by(ur_id=uid)
        c_user = UCred.query.filter_by(user_id=uid).first()
        return render_template(
            "AddTracker.html", uid=uid, trackers=trl, uname=c_user.fname
        )

    if request.method == "POST":
        formdat = list(request.form.values())
        new_tracker = Tracker(ur_id=uid, tr_name=formdat[0], desc=formdat[1])
        db.session.add(new_tracker)
        db.session.commit()
        return redirect(url_for("index", uid=uid))


@app.route("/tracker/update/<int:uid>/<int:tracker_id>", methods=["GET", "POST"])
def updt_tracker(uid, tracker_id):
    if request.method == "GET":
        trl = Tracker.query.filter_by(ur_id=uid)
        c_user = UCred.query.filter_by(user_id=uid).first()
        ctr = Tracker.query.filter(Tracker.tr_id == tracker_id).first()
        return render_template(
            "UpdateTracker.html",
            uid=uid,
            trackers=trl,
            uname=c_user.fname,
            ctr=ctr,
            tracker_id=tracker_id,
        )

    if request.method == "POST":
        formdat = list(request.form.values())
        ctr = Tracker.query.filter(Tracker.tr_id == tracker_id).first()
        (ctr.tr_name, ctr.desc) = (formdat[0], formdat[1])
        db.session.commit()
        return redirect(url_for("display_tracker", uid=uid, tracker_id=tracker_id))


@app.route(
    "/tracker/updatelog/<int:uid>/<int:tracker_id>/<int:lid>", methods=["GET", "POST"]
)
def update_log(tracker_id, uid, lid):
    if request.method == "GET":
        trl = Tracker.query.filter_by(ur_id=uid)
        c_user = UCred.query.filter_by(user_id=uid).first()
        clog = TrackedLogs.query.filter(TrackedLogs.l_id == lid).first()
        return render_template(
            "UpdateLog.html",
            trackers=trl,
            uname=c_user.fname,
            uid=uid,
            log=clog,
            tracker_id=tracker_id,
            lid=lid,
        )

    if request.method == "POST":
        formdat = list(request.form.values())
        clog = TrackedLogs.query.filter(TrackedLogs.l_id == lid).first()
        (clog.logval, clog.note) = (formdat[0], formdat[1])
        db.session.commit()
        return redirect(url_for("display_tracker", uid=uid, tracker_id=tracker_id))


@app.route(
    "/tracker/deletelog/<int:uid>/<int:tracker_id>/<int:lid>", methods=["GET", "POST"]
)
def del_log(tracker_id, uid, lid):
    if request.method == "GET":
        clog = TrackedLogs.query.filter(TrackedLogs.l_id == lid).first()
        db.session.delete(clog)
        db.session.commit()
        return redirect(url_for("display_tracker", tracker_id=tracker_id, uid=uid))


@app.route("/tracker/deletetracker/<int:uid>/<int:tracker_id>", methods=["GET", "POST"])
def delete_tracker(tracker_id, uid):
    if request.method == "GET":
        dlogs = TrackedLogs.__table__.delete().where(TrackedLogs.t_id == tracker_id)
        deltr = Tracker.query.filter(Tracker.tr_id == tracker_id).one()
        db.session.execute(dlogs)
        db.session.delete(deltr)
        db.session.commit()
        return redirect(url_for("index", uid=uid))


def visualisationline(tracker_id, logs):
    xvals = [log.date for log in logs]
    yvals = [log.logval for log in logs]

    plt.xlabel("DATE")
    plt.ylabel("CALORIES CONSUMED")
    plt.title("Complete Visualisation of your Logs")
    plt.rcParams["figure.autolayout"] = True

    plt.plot(
        xvals,
        yvals,
        "-rD",
        linewidth="3",
        path_effects=[path_effects.SimpleLineShadow(), path_effects.Normal()],
    )
    plt.grid(color="blue", linestyle="--", linewidth=0.5)
    plt.gcf().autofmt_xdate()
    file_path = "static/graphs/linetracker_" + str(tracker_id) + ".png"
    plt.savefig(file_path)
    plt.close()

    return file_path


def visualisationbar(tracker_id, logs):
    xvals = list((islice(reversed([log.date for log in logs]), 0, 7)))
    xvals.reverse()
    yvals = list((islice(reversed([log.logval for log in logs]), 0, 7)))
    yvals.reverse()

    if yvals:
        calavg = st.mean(yvals)
    else:
        calavg = 0

    plt.xlabel("DATE")
    plt.ylabel("CALORIES CONSUMED")
    plt.title("Weekly Summary of your Logs / " + "Average Cals = " + str(calavg))
    plt.rcParams["figure.autolayout"] = True

    plt.grid(color="green", linestyle="--", linewidth=0.5)
    plt.bar(
        xvals,
        yvals,
        color="royalblue",
        alpha=None,
        path_effects=[path_effects.SimplePatchShadow(), path_effects.Normal()],
    )
    plt.gcf().autofmt_xdate()
    file_path = "static/graphs/bartracker_" + str(tracker_id) + ".png"
    plt.savefig(file_path)
    plt.close()

    return file_path


# <--------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
if __name__ == "__main__":
    # Run the Flask app
    app.run(debug=True)
