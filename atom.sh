#!/usr/bin/env bash

cd input/posts || exit
adduce feed atom
cd ../..
cp input/posts/export/feed.xml docs/posts/feed.xml
