#!/usr/bin/env bash

# Generate standard pages
pages=(
    "input/pages/index index.html"
    "input/pages/posts posts.html"
    "input/pages/portfolio portfolio.html"
    "input/pages/contact contact.html"
    "input/pages/support support.html"
    "input/pages/services services.html"
	"input/pages/404 404.html"
)

for page_input in "${pages[@]}"; do
    page="${page_input%% *}"
    output="${page_input#* }"
    adduce -c "$page" -n "$output" -o docs
done

# Generate posts
cd input/posts || exit
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
cp -r export/. ../../docs/posts
cd ../..

# Generate portfolio items
cd input/portfolio || exit
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
cp -r export/. ../../docs/portfolio
cd ../..

# Copy global styles and assets
cp -r input/global/assets docs/
cp -r input/global/styles docs/
cp -r input/global/scripts docs/
