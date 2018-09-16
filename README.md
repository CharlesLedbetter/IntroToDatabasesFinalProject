# IntroToDatabasesFinalProject
This program and database was created for the final project for
Oregon State University's Intro to Databases course.

To install and run the database and website do the following:

On windows systems take the following steps and then follow
all steps within the Mac or Linux systems section:

1) If it is not already present on your system install PuTTy
   or some other terminal emulator for your Windows system. You
   can find PuTTy at https://www.putty.org.

On All Systems:

1) Download and install XAMPP or some other phpMySql manager.
   You can find XAMPP at https://www.apachefriends.org/download.html

2) Open XAMPP and click on the 'click on application' button.
   A pop up should come up that asks if you want to turn on all
   servers. Click 'Start Servers'.

3) Clone this repo to your local machine.

4) A window should open in your browser. Click phpMySql in the
   navigation bar at the top of the browser.

5) On the left of the new screen you should see a tree of databases.
   On top of the tree click the 'new' button.

6) Enter 'fp_DB' without the quotes in the 'Database name' text box
   and click the 'create' button.

7) 'fp_DB' should have appeared in the tree on the left. Click it and
   then click the 'Import' button on the navigation bar at the top.

8) Uncheck the 'Enable foreign key checks' checkbox.

9) Change the 'SQL compatibility mode' to 'MYSQL323'.

10) Leave everything else on this page as default and then click the
    'Choose File' button and use the file navigator to navigate to the
    finalProjectDefinitions.sql within the cloned git repository.

11) Then press the 'Go' button at the bottom of the page.

12) Now use the terminal / commandline console to navigate to the
    cloned repo and enter:

        node finalProject.js

13) Now use your internet browser to navigate to 'localhost:4000'.

14) Use your web browser to navigate the site.

15) When you are finished use the terminal / commandline console
    to kill the finalProject.js program using Ctrl-C.
