#!/usr/bin/env bash
adduce -c config/pages/index -n index.html -o docs
adduce -c config/pages/blog -n blog.html -o docs
adduce -c config/pages/portfolio -n portfolio.html -o docs
adduce -c config/pages/contact -n contact.html -o docs
adduce -c config/pages/donate -n donate.html -o docs
adduce -c config/pages/404 -n 404.html -o docs
adduce -c config/pages/services -n services.html -o docs

cd blog
adduce feed publish Welcome
adduce feed publish Revolt_Promotion
adduce feed publish LibreOffice_Setup
adduce feed publish Halo_My_Thoughts
adduce feed publish Making_Windows_Usable
adduce feed publish Prematurely_Pulling_The_Plug_On_3G
adduce feed publish A_Year_With_The_Framework_Laptop_13
adduce feed publish Everything_Is_Chrome
adduce feed publish I_Hate_My_Nokia
adduce feed publish Cybersecurity_Superstition
adduce feed publish Minecraft_Nostalgia_And_Growing_Up
cp -r feed/export/. ../docs/blog

cd ../

cd portfolio
adduce feed publish CapChord
adduce feed publish devoposters
adduce feed publish futurefrequencies
adduce feed publish koko
adduce feed publish meattypeface
adduce feed publish photography
adduce feed publish poemsbypam
adduce feed publish smashburger
cp -r feed/export/. ../docs/portfolio

cd ../

cp -r config/global/style docs/
cp -r config/global/assets docs/
