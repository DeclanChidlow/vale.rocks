#!/usr/bin/env bash
/home/vale/gitrepos/Adduce/target/release/adduce -c config/pages/index -n index.html -o docs
/home/vale/gitrepos/Adduce/target/release/adduce -c config/pages/blog -n blog.html -o docs
/home/vale/gitrepos/Adduce/target/release/adduce -c config/pages/portfolio -n portfolio.html -o docs
/home/vale/gitrepos/Adduce/target/release/adduce -c config/pages/contact -n contact.html -o docs
/home/vale/gitrepos/Adduce/target/release/adduce -c config/pages/donate -n donate.html -o docs
/home/vale/gitrepos/Adduce/target/release/adduce -c config/pages/404 -n 404.html -o docs
/home/vale/gitrepos/Adduce/target/release/adduce -c config/pages/services -n services.html -o docs

cd blog
/home/vale/gitrepos/Adduce/target/release/adduce feed publish Welcome
/home/vale/gitrepos/Adduce/target/release/adduce feed publish School_Internet
/home/vale/gitrepos/Adduce/target/release/adduce feed publish LibreOffice_Setup
/home/vale/gitrepos/Adduce/target/release/adduce feed publish Halo_My_Thoughts
/home/vale/gitrepos/Adduce/target/release/adduce feed publish Making_Windows_Usable
/home/vale/gitrepos/Adduce/target/release/adduce feed publish Prematurely_Pulling_The_Plug_On_3G
/home/vale/gitrepos/Adduce/target/release/adduce feed publish A_Year_With_The_Framework_Laptop_13
/home/vale/gitrepos/Adduce/target/release/adduce feed publish Everything_Is_Chrome
/home/vale/gitrepos/Adduce/target/release/adduce feed publish I_Hate_My_Nokia
/home/vale/gitrepos/Adduce/target/release/adduce feed publish Cybersecurity_Superstition
/home/vale/gitrepos/Adduce/target/release/adduce feed publish Minecraft_And_Me
cp -r feed/export/. ../docs/blog

cd ../

cd portfolio
/home/vale/gitrepos/Adduce/target/release/adduce feed publish Mutant_Remix
/home/vale/gitrepos/Adduce/target/release/adduce feed publish CapChord
/home/vale/gitrepos/Adduce/target/release/adduce feed publish Poems_By_Pam
/home/vale/gitrepos/Adduce/target/release/adduce feed publish Meat_Typeface
/home/vale/gitrepos/Adduce/target/release/adduce feed publish Photography
cp -r feed/export/. ../docs/portfolio

cd ../

cp -r config/global/style docs/
cp -r config/global/assets docs/
