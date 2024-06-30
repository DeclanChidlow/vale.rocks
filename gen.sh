#!/usr/bin/env bash

# Generate standard pages
pages=(
    "config/pages/index index.html"
    "config/pages/posts posts.html"
    "config/pages/portfolio portfolio.html"
    "config/pages/contact contact.html"
    "config/pages/support support.html"
    "config/pages/services services.html"
	"config/pages/404 404.html"
)

for page_config in "${pages[@]}"; do
    page="${page_config%% *}"
    output="${page_config#* }"
    adduce -c "$page" -n "$output" -o docs
done

# Generate posts
cd posts || exit
post_feeds=(
    "Welcome"
    "School-Internet"
    "LibreOffice-Setup"
    "Halo-My-Thoughts"
    "Making-Windows-Usable"
    "Prematurely-Pulling-The-Plug-On-3G"
    "A-Year-With-The-Framework-Laptop-13"
    "Everything-Is-Chrome"
    "I-Hate-My-Nokia"
    "Cybersecurity-Superstition"
    "Minecraft-Nostalgia-And-Growing-Up"
    "My-Code-Formatting-Guidelines"
    "JPEG-XL-And-Googles-War-Against-It"
    "I-Got-A-Flipper-Zero"
)
for feed in "${post_feeds[@]}"; do
    adduce feed export "$feed"
done
adduce feed rss
cp -r feed/export/. ../docs/posts
cd ..

# Generate portfolio items
cd portfolio || exit
portfolio_feeds=(
    "Mutant-Remix"
    "CapChord"
    "Pam-Carters-Scriptural-Poetry"
    "Photography"
    "Meat-Typeface"
)
for feed in "${portfolio_feeds[@]}"; do
    adduce feed export "$feed"
done
cp -r feed/export/. ../docs/portfolio
cd ..

# Copy global styles and assets
cp -r config/global/assets docs/
cp -r config/global/styles docs/
cp -r config/global/scripts docs/
