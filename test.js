const { cof2Obj, geoMagFactory } = require('.');
const fs = require('fs');
const util = require('util');
const path = require('path');

const readFileAsync = util.promisify(fs.readFile);

const test = async () => {
  const cof = await readFileAsync(path.resolve(__dirname, './WMM.COF'), {
    encoding: 'utf-8',
  });
  const wmm = cof2Obj(cof);
  const geoMag = geoMagFactory(wmm);
  const altitude = 0; // feet (optional, default is 0)
  const myGeoMag = geoMag(31.855218975, 118.81091156, altitude);
  const magneticVariation = myGeoMag.dec; // Geomagnetic declination (variation)
                                          // in decimal degrees
                                          // -- east is positive
  console.log(magneticVariation);
};

test();
