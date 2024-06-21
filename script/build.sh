#!/bin/bash

build() {
    echo 'Building app.readtheone...'
    rm -rf dist
    tsc
    vite build
}

build
