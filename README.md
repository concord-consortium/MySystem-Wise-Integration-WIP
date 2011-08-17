

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
1. commit your changes: `git ci -a -m "commit message here\n\n built from: cf1b50d"`
1. optionally tag the commit: `git tag -a <tagName> -m "<more info here>"`
1. push the changes: `git push --tags`

## To Modify *THIS* Readme File

This README.md is generated from the rake task of the [MySystem][] Repo.

Update `wise4/mysystem2/README.md.erb` To have your changes appear here.
Otherwise *your local changes will be overwritten*.


## Current [MySystem][] ( [cf1b50d][] ) Version fronzen into [This repository][]

    MySystem Git Sha :   cf1b50de817bf66af2b049d8b770308cc04020e6
    Git commit time  :   Wed Aug 17 15:35:30 2011 -0400
    Git Branch / refs:   (HEAD, origin/raphaelviews, raphaelviews, moreVersionInfo)
    Build Time       :   2011-08-17 15:44:09 -0400
    SproutCore Build :   7fc4d4cd8e837ed54b4439dd7be7ad5b34d48ca6

[cf1b50d]: https://github.com/concord-consortium/mysystem_sc/commits/cf1b50de817bf66af2b049d8b770308cc04020e6
[This repository]: https://github.com/concord-consortium/MySystem-Wise-Integration-WIP
[WISE4]: http://wise4.org
[MySystem]: https://github.com/concord-consortium/mysystem_sc
[rvm]: http://beginrescueend.com

