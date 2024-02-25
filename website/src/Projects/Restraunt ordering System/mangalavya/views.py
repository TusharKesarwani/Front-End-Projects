from django.shortcuts import redirect, render
import requests
from django.views.decorators.csrf import csrf_exempt, csrf_protect
# Create your views here.
def login(request):
    if request.method == 'POST':
        email = request.POST.get("email")
        password = request.POST.get("password")

        url = "https://stiffish-highline.000webhostapp.com/loginapi.php"
        params = {
            "email": email,
            "password": password
        }
        r2 = requests.post(url=url, data=params)
        print(params)
        print(r2.text)

        res = r2.json()
        ev = res['error']
        if not ev:
            uloginid = res['user']['LOGIN_ID']
            role = res['user']['ROLE']
            ufname = res['user']['FIRST_NAME']
            ulname = res['user']['LAST_NAME']
            ugender = res['user']['GENDER']
            uaddress = res['user']['ADDRESS']
            uemail = res['user']['EMAIL_ID']
            ustate = res['user']['STATE']
            uphone = res['user']['PHONE_NO']

            # This will store information of user.
            if role == "0":
                request.session['log_email'] = uemail
                request.session['log_role'] = role
                request.session['log_id'] = uloginid
                request.session['log_fname'] = ufname
                request.session['log_lname'] = ulname
                request.session['log_gender'] = ugender
                request.session['log_address'] = uaddress
                request.session['log_ustate'] = ustate
                request.session['log_phone'] = uphone
                request.session.save()
                return redirect(index2)

            # This will store information of admin.
            else:
                request.session['log_user_email'] = uemail
                request.session['log_user_id'] = uloginid
                request.session['log_user_fname'] = ufname
                request.session['log_user_lname'] = ulname
                request.session['log_user_gender'] = ugender
                request.session['log_user_address'] = uaddress
                request.session['log_user_ustate'] = ustate
                request.session['log_user_phone'] = uphone
                request.session['log_user_role'] = role
                request.session.save()
                return redirect(index)

    try:
        if request.session["log_email"] is not None:
            return render(request,"index2.html")
    except:
        pass
    try:
        if request.session["log_user_email"] is not None:
            return render(request,"index.html")
    except:
        pass

    return render(request, 'page-login.html')

def index(request):
    try:
        if request.session["log_user_email"] is None:
            return redirect(login)
        else:
            url = "https://stiffish-highline.000webhostapp.com/fetchorderapi.php"
            response = requests.get(url=url)
            ultra_res = response.json()
            records = {}
            records['data'] = ultra_res
            return render(request, 'index.html', records)
    except:
        pass
    return render(request, 'page-login.html')


def profile(request):
    try:
        if request.session["log_user_email"] is None:
            return redirect(login)
        else:
            return render(request, 'app-profile.html')
    except:
        pass
    return render(request, 'page-login.html')

def formedit(request):
    try:
        if request.session["log_user_email"] is None:
            return redirect(login)
        else:
            return render(request, 'form-validation.html')
    except:
        pass
    return render(request,'page-login.html')
    
def pagelock(request):
    try:
        if request.session["log_user_email"] is None:
            return redirect(login)
        else:
            return render(request, 'page-lock.html')
    except:
        pass
    return render(request, 'page-login.html')

def logout(request):
    try:
        del request.session['log_user_email']
        del request.session['log_user_id']
        del request.session['log_user_fname']
        del request.session['log_user_lname']
        del request.session['log_user_gender']
        del request.session['log_user_address']
        del request.session['log_user_ustate']
        del request.session['log_user_phone']
        del request.session['log_user_role']

        
        del request.session['log_email']
        del request.session['log_id']
        del request.session['log_fname']
        del request.session['log_lname']
        del request.session['log_gender']
        del request.session['log_address']
        del request.session['log_ustate']
        del request.session['log_phone']
        del request.session['log_role']


    except:
        pass

    return render(request, 'page-logout.html')


@csrf_exempt
def signup(request):
    try:
        if request.session["log_user_email"] or request.session["log_email"] is None:
            return render(request, 'page-register.html')
        else:
            if request.method == 'POST':
                fname = request.POST.get("fname")
                lname = request.POST.get("lname")
                email = request.POST.get("email")
                password = request.POST.get("password")
                phone = request.POST.get("phone")
                address = request.POST.get("address")
                gender = request.POST.get("gender")
                state = request.POST.get("state")
                # Email Code
                url2 = "https://stiffish-highline.000webhostapp.com/singupapi.php"
                params1 = {
                    'fname': fname,
                    'lname': lname,
                    'email': email,
                    'password': password,
                    'phone': phone,
                    'address': address,
                    'gender': gender,
                    'state':state
                }

                rtt55 = requests.post(url=url2, data=params1)
                print(rtt55.text)
                res = rtt55.json()
                ev = res['error']
                if not ev:
                    return render(request, 'page-login.html', params1)
            else:
                return render(request,'page-register.html')
    except:
        pass
    return render(request, 'page-register.html')


def datatable(request):
    try:
        if request.session["log_user_email"] is None:
            return redirect(login)      
        else:
            url = "https://stiffish-highline.000webhostapp.com/fetchorderapi.php"
            response = requests.get(url=url)
            ultra_res = response.json()
            records = {}
            records['data'] = ultra_res
            print(records)
            return render(request, 'table-datatable.html', records)
    except:
        pass
    return render(request, 'page-login.html')

def page400(request):
        return render(request, 'page-error-400.html')

def page404(request):
    return render(request, 'page-error-404.html')

def page403(request):
    return render(request, 'page-error-403.html')

def page500(request):
    return render(request, 'page-error-500.html')

def page503(request):
    return render(request, 'page-error-503.html')

def holo1(request):
    return render(request, 'holo1.html')

def holo2(request):
    return render(request, 'holo2.html')

def holo3(request):
    return render(request, 'holo3.html')

def holo4(request):
    return render(request, 'holo4.html')

def holo5(request):
    return render(request, 'holo5.html')

def holo6(request):
    return render(request, 'holo6.html')

def holo7(request):
    return render(request, 'holo7.html')

def holo8(request):
    return render(request, 'holo8.html')

def index2(request):
    if request.method == 'GET':
        itemname = request.POST.get("itemname")
        price = request.POST.get("price")

        url = "https://stiffish-highline.000webhostapp.com/orderapi.php"
        params = {
            "price": price,
            "itemname": itemname
        }
        r2 = requests.post(url=url, data=params)
        print(params)
        print(r2.text)

        res = r2.json()
        return render(request, 'index2.html')
    return render(request, 'page-login.html' )