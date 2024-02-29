<head>
    <title>Connecting to Australian Public School Internet | Vale.Rocks</title>
    <meta property="og:title" content="Connecting to Australian Public School Internet"/>
    <meta name="description" content="The Education Department of Australia does some silly stuff with their network quite frequently. This tutorial shows you how to get up and running in no time at all." />
    <meta property="og:description" content="The guide for when someone breaks the internet. Again..." />
    <meta property="article:published_time" content="2022-10-12" />
    <meta property="article:modified_time" content="2023-11-22" />
    <meta property="article:section" content="Tutorial" />
</head>

<article>
<header>
	 Tutorial
	<h1>
		Connecting to Australian Public School Internet
	</h1>
	<ul>
		<li><time datetime="2022-10-12">12 Oct, 2022</time></li>
	    <li>539 words</li>
		<li>2 minute read</li>
	</ul>
</header>

Every now and then, somebody decides that it is time to mess around and 'improve' enterprise Wi-Fi. As of late, someone has been tweaking and mucking about with the internet configuration of Australian public schools.

This brief tutorial aims to outline how to properly connect to Australian public-school Wi-Fi at the current time.

## Step 1
The first step in getting onto the network is to find out if your password has expired. In most cases, your Department of Education login (the same one you use to access Connect and/or Seqta) will expire every 90 days (about 3 months).

If you expect that your password has expired, you will have to reset it.

If you have an internet connection, then the easiest way to reset it is through the [DoE Portal](https://apps.det.wa.edu.au/dam/portal/changePassPage.do).

You could also go to [Connect](https://connect.det.wa.edu.au) and login. Once logged in, you can navigate to 'My Connect' and change your password to something new and secure.

In the event that you don't have an internet connection, you can request that your teacher or network admin changes your password.

## Step 2
Your next step is to install the required certificates. These certificates allow you to certify yourself on the network. The process varies based on your computer's operating system.

<span class="alert warning">
Note that installing these certificates allows your school to view encrypted network packets sent to or from your device. That means that your school can see your passwords, what sites you visit, and, in some cases, your search history.
</span>

### Windows
1. If using Windows, you must first connect to the school network. The certificates are only available on the internal network and not on non-school Wi-Fi.
2. Once connected, you must download these certificates:
* [Education-CA.cer](https://certs.education.wa.edu.au/education-pki/cert/Education-CA.cer)
* [Education-SubCA1.cer](https://certs.education.wa.edu.au/education-pki/cert/Education-SubCA1.cer)
* [Education-SubCA2.cer](https://certs.education.wa.edu.au/education-pki/cert/Education-SubCA2.cer)
3. On your keyboard, hit the 'Windows' key and R key simultaneously. In the box that appears, type `mmc.exe`.
4. In the application that opens, press the Ctrl key and the M key simultaneously.
5. In the left panel, double click 'Certificates'. In the pop-up that opens, select 'Computer account' and then click next.
6. Select 'Local computer' and then click Finish. You should be directed back to the main page of the application.
7. In the left panel, you should click the small arrow next to 'Certificates (Local Computer)' to expand the category. Then click the small arrow next to 'Trusted Root Certification Authorities'.
8. You should now see the Certificates folder on the left panel. Right click the folder to bring up the context menu. In the menu, select All Tasks and then Import.
9. In the wizard that should have appeared, select 'Local Machine' and then 'Next'.
10. On the next page, click 'Browse...' and locate your certificates. Select one of them, click open, and then click 'Next'.
11. In the next pop-up, select 'Trusted Root Certification Authorities' and then click 'OK'.
12. You should now be presented with a page showing the settings you've chosen in this guide. The 'Certificate Store Selected by User' should be 'Trusted Root Certification Authorities' and the 'Content' should be 'Certificate'.

### Linux
If using Linux, you can use the [DoE-Network-Kit-Linux](https://github.com/toastxc/DoE-Network-Kit-Linux).

## Step 3
You can now log onto your school's internet, and it should work. You can login [here](http://sig.site.internal:1000/login?).

---

Had any issues with the process? Leave a comment down below, and I'll try my best to assist.

</article>

<span class="giscus"></span>
