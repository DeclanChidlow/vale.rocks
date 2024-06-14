#!/usr/bin/env bash

# Generate standard pages
pages=(
    "config/pages/index index.html"
    "config/pages/blog blog.html"
    "config/pages/portfolio portfolio.html"
    "config/pages/contact contact.html"
    "config/pages/donate donate.html"
    "config/pages/services services.html"
	"config/pages/404 404.html"
)

for page_config in "${pages[@]}"; do
    page="${page_config%% *}"
    output="${page_config#* }"
    /home/vale/gitrepos/Adduce/target/release/adduce -c "$page" -n "$output" -o docs
done

# Generate blog posts
cd blog
blog_feeds=(
    "Welcome"
    "School_Internet"
    "LibreOffice_Setup"
    "Halo_My_Thoughts"
    "Making_Windows_Usable"
    "Prematurely_Pulling_The_Plug_On_3G"
    "A_Year_With_The_Framework_Laptop_13"
    "Everything_Is_Chrome"
    "I_Hate_My_Nokia"
    "Cybersecurity_Superstition"
    "Minecraft_Nostalgia_And_Growing_Up"
    "My_Code_Formatting_Guidelines"
    "JPEG_XL_And_Googles_War_Against_It"
    "I_Got_A_Flipper_Zero"
)
for feed in "${blog_feeds[@]}"; do
    /home/vale/gitrepos/Adduce/target/release/adduce feed publish "$feed"
done
cp -r feed/export/. ../docs/blog
cd ..

# Generate portfolio items
cd portfolio
portfolio_feeds=(
    "Mutant_Remix"
    "CapChord"
    "Pam_Carters_Scriptural_Poetry"
	"Photography"
    "Meat_Typeface"
)
for feed in "${portfolio_feeds[@]}"; do
    /home/vale/gitrepos/Adduce/target/release/adduce feed publish "$feed"
done
cp -r feed/export/. ../docs/portfolio
cd ..

# Copy global styles and assets
cp -r config/global/assets docs/
cp -r config/global/styles docs/
cp -r config/global/scripts docs/
