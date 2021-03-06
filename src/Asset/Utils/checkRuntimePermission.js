import React, { Component } from "react";
import { PermissionsAndroid } from "react-native";

const CheckRuntimePermission = async permissionRequest => {
  let finalGranted;
  var requestArrayCammera = [
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  ];
  var requestArrayLocation = [
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
  ];
  var requestArray;

  try {
    if (permissionRequest == "CAMERA") {
      requestArray = requestArrayCammera;
    } else if (permissionRequest == "LOCATION") {
      requestArray = requestArrayLocation;
    }

    const granted = await PermissionsAndroid.requestMultiple(requestArray).then(
      granted => {
        Object.keys(granted).map(function(keyName, keyIndex) {
          // use keyName to get current key's name
          // and a[keyName] to get its value

          if (granted[keyName] === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log("You can use the" + keyName);
            finalGranted = "true";
          } else {
            // console.log(keyName + "permission denied");
            finalGranted = "false";
          }
        });
      }
    );
  } catch (err) {
    console.warn(err);
  }
  //alert(JSON.stringify(granted))
  return finalGranted;
};

export { CheckRuntimePermission };
