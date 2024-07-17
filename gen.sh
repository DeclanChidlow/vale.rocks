#!/usr/bin/env bash
set -euo pipefail

generate_pages() {
    local input_dir="input/pages"
    local output_dir="docs"
    local output_dir="docs"

    echo "Generating individual pages..."
    for page_dir in "$input_dir"/*/; do
        page_name=$(basename "${page_dir%/}")
        output_file="${page_name}.html"
        
        adduce -c "$page_dir" -n "$output_file" -o "$output_dir"
    done
}

generate_items() {
    local directory=$1
    local output_dir=$2

    echo "Generating items for $directory..."
    cd "$directory" || { echo "Error: $directory directory not found"; exit 1; }
    adduce feed establish
    
    for item in documents/*; do
        if [ -f "$item" ]; then
            item_name=$(basename "$item" .md)
            adduce feed export "$item_name"
        fi
    done
    
    mkdir -p "../../docs/$output_dir"
    cp -r export/. "../../docs/$output_dir" || { echo "Error copying items to docs/$output_dir directory"; exit 1; }
    cd ../.. || exit
}

generate_posts() {
    generate_items "input/posts" "posts"
}

generate_portfolio() {
    generate_items "input/portfolio" "portfolio"
}

generate_tools() {
    generate_items "input/tools" "tools"
}

copy_global_assets() {
    echo "Copying styles, scripts and assets..."
    cp -r input/global/styles docs/ || { echo "Error copying styles"; exit 1; }
    cp -r input/global/scripts docs/ || { echo "Error copying scripts"; exit 1; }
    cp -r input/global/assets docs/ || { echo "Error copying assets"; exit 1; }
}

main() {
    generate_pages
    generate_posts
    generate_portfolio
    generate_tools
    copy_global_assets
    echo "Site built successfully!"
}

main
