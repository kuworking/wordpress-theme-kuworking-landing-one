// require modules
var fs = require('fs')
var archiver = require('archiver')

// get year and year-week
function getWeek() {
  var date = new Date()
  var dt = new Date(date.getFullYear(), 0, 1)
  var week = Math.ceil(((date - dt) / 86400000 + dt.getDay() + 1) / 7)
  return date.getFullYear() + '_' + week
}

// create a file to stream archive data to.

var name = __dirname + '/wordpress-theme-kuworking-landing-one.zip'
var name2 = __dirname + '/wordpress-theme-kuworking-landing-one.' + getWeek() + 'zip'
var output = fs.createWriteStream(name)
var archive = archiver('zip', {
  zlib: { level: 9 }, // Sets the compression level.
})

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function () {
  console.log(archive.pointer() + ' total bytes')
  console.log('archiver has been finalized and the output file descriptor has closed.')
  fs.copyFile(name, name2, err => {
    if (err) throw err
    console.log('zip duplicated')
  })
})

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function () {
  console.log('Data has been drained')
})

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function (err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err
  }
})

// good practice to catch this error explicitly
archive.on('error', function (err) {
  throw err
})

// pipe archive data to the file
archive.pipe(output)

// append files from a sub-directory and naming it `new-subdir` within the archive
archive.directory('src/', 'src')
archive.directory('build/', 'build')
archive.directory('static/', 'static')
archive.directory('templates/', 'templates')

// append files from a glob pattern
archive.glob('*.json')
archive.glob('*.php')
archive.glob('*.png')
archive.glob('*.css')

// finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
archive.finalize()
