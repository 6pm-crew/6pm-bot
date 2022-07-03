#!/bin/bash

testing=$(pgrep -f index)

while true
do

	if [ -e "/proc/$testing" ]
	then
		node build/index.js
	fi
	sleep 1
done




