# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [v2.0.0] 2018-04-20
### Changed
- `spawn()` now returns an object with multiple properties rather than just a
  closed Promise.  This was done to give access to the underlying child process
  so that users can do things like `kill()` it.

## [v1.0.0] 2018-04-10
### Added
Initial project creation.
