const { cof2Obj, geoMagFactory } = require('.');
const fs = require('fs');
const util = require('util');
const path = require('path');

const readFileAsync = util.promisify(fs.readFile);

const test = async () => {
  var cof = await readFileAsync(path.resolve(__dirname, './WMM.COF'), {
    encoding: 'utf-8',
  }),
  wmm = cof2Obj(cof),
  geoMag = geoMagFactory(wmm),
  latitude = 80,                // decimal degrees (north is positive)
  longitude = 0,              // decimal degrees (east is positive)
  altitude = 0,                   // feet (optional, default is 0)
  time = new Date(2017, 5, 20),   // optional, default is the current system time
  myGeoMag = geoMag(latitude,longitude,altitude,time),
  magneticVariation = myGeoMag.dec,   // Geomagnetic declination (variation)
                                      // in decimal degrees
                                      // -- east is positive
  magneticDip = myGeoMag.dip, // Geomagnetic dip in decimal degrees
                              // (down is positive)
  magneticFieldIntensity = myGeoMag.ti,   // Total Intensity of the
                                          // geomagnetic field in  nanoteslas
  magneticBH = myGeoMag.bh,   // Horizontal Intensity of the geomagnetic
                              // field in nT
  magneticBX = myGeoMag.bx,   // North Component of the geomagnetic field in nT
  magneticBY = myGeoMag.by,   // East Component of the geomagnetic field in nT
  magneticBZ = myGeoMag.bz,   // Vertical Component of the geomagnetic field
                              // (down is positive)
  lat = myGeoMag.lat, // input latitude
  lon = myGeoMag.lon; // input longitude
  console.log(myGeoMag);
};

test();
