<h1 align="center">Contributors Guide⚡ </h1>
<h3 align="center">Welcome to our open-source project! 😍<br> We appreciate your interest in contributing.😊 <br>This guide will help you get started with the project and make your first contribution.</h3>



<h1 align="center">Creating first Pull Request 🌟</h1>

---
1. Create a folder at you desired location (usually at your desktop).

2. Open Git Bash Here.

3. Create a Git Repository.
   Run the command ```git init```

4. Fork the [repository](https://github.com/TusharKesarwani/Front-End-Projects.git).

5. Clone your forked repository of project.
```
git clone https://github.com/<your-github-username>/Front-End-Projects.git
```
  
6. Navigate to the project directory.
```
cd Front-End-Projects
```

7. Add a reference(remote) to the original repository.
```
git remote add upstream https://github.com/TusharKesarwani/Front-End-Projects.git
```

8. Check the remotes for this repository.
```
git remote -v
```

9. Always take a pull from the upstream repository to your main branch to keep it updated as per the main repository.
```
git pull upstream main
```

8. Create a new branch.
```
git checkout -b <your_branch_name>
```

9. Perform your desired changes to the code base.

10. Check your changes
```
git status
```
```
git diff
```

11. Stage your changes
```
git add . <\files_that_you made_changes>
```

12. Commit your changes.
```
git commit -m "<your_commit_message>"
```

13. Push the committed changes in your feature branch to your remote repository.
```
git push -u origin <your_branch_name>
```

14. To create a Pull Request, click on ```compare and pull requests```.

15. Add an appropriate title and description to your PR explaining your changes.

18. Click on ```create pull request```.

Congratulations🎉, you have made a PR to the Front-End Projects. Wait for your submission to be accepted and your PR to be merged by a maintainer.

If you have any doubts please let us know in comments.

<h1 align="center">Communication and Support 💬</h1>
<p align="center">Join the project's communication channels to interact with other contributors and seek assistance.</br>If you have any questions or need help, don't hesitate to ask in the project's communication channels or comment on the relevant issue.</p>

<h1 align="center">Code of Conduct 😇</h1>
<p align="center">Please follow our project's code of conduct while contributing.</br>Treat all contributors and users with respect and create a positive and inclusive environment for everyone.</p>

<h1 align="center">License 📄</h1>
<p align="center">The project is licensed under [MIT]. Make sure to review and comply with the license terms.</br>We hope this guide helps you get started with contributing to our open-source project. Thank you for your contribution!</p>

<h1 align="center">Note from Author ❗</h1>
<p align="center">While on one hand our repository is a good place for beginners to contribute something useful to open source, on the other hand it is also a good place for experienced people to contribute something useful to open source.</br>We welcome contributions from everyone. However some people tend to spam the repository with irrelevant pull requests and get one PR for SSOC 2.0 and other such open source events. We do not want that to happen.</br>So we have a few guidelines that we would like you to follow. In case we find your PR not relevant or spam, we will mark it as invalid and it will not be counted towards SSOC 2.0.</p>
