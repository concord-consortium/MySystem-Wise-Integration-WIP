

## Overview
[This repository][] tracks the current _working_ [WISE4][] step of [MySystem][mysystem]

The export is a copy of all of the files found in vle/mysystem2/ directory after running `bundle exec rake build`
from a checkout of [MySystem][].

## Instructions:

The build process uses ruby. We recommend installing the Ruby Version Manager [rvm][] before getting started.

1. checkout [MySystem][]  `git clone git://github.com/concord-consortium/mysystem_sc.git`
1. enter the project directory: `cd mysystem_sc`
1. install required gems:  `bundle install`
1. build everything: `bundle exec rake build`
1. pop out to your development directory: `cd ..`
1. checkout [This repository][] `git clone https://<username>@github.com/concord-consortium/MySystem-Wise-Integration-WIP.git`
1. enter the directory: `cd MySystem-Wise-Integration-WIP`
1. copy the files over: `cp -r ../mysystem_sc/vle/node/mysystem2/* .`
1. commit your changes: `git ci -a -m "commit message here\n\n built from: c36b4a2"`
1. optionally tag the commit: `git tag -a <tagName> -m "<more info here>"`
1. push the changes: `git push --tags`

## To Modify *THIS* Readme File

This README.md is generated from the rake task of the [MySystem][] Repo.

Update `wise4/mysystem2/README.md.erb` To have your changes appear here.
Otherwise *your local changes will be overwritten*.


## Current [MySystem][] ( [c36b4a2][] ) Version fronzen into [This repository][]

    MySystem Git Sha :   c36b4a205745a8c5379e59d1eeeec937117a7a46
    Git commit time  :   Fri Mar 23 15:24:04 2012 -0400
    Git Branch / refs:   (HEAD, origin/master, origin/HEAD, master, dynamic_resize_links)
    Build Time       :   2012-03-23 17:00:12 -0400
    SproutCore Build :   1fdc0266e43e8748c1305b0584ed5ab2125b308a

[c36b4a2]: https://github.com/concord-consortium/mysystem_sc/commits/c36b4a205745a8c5379e59d1eeeec937117a7a46
[This repository]: https://github.com/concord-consortium/MySystem-Wise-Integration-WIP
[WISE4]: http://wise4.org
[MySystem]: https://github.com/concord-consortium/mysystem_sc
[rvm]: http://beginrescueend.com

