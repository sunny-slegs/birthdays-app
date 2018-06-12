'use strict';

const api = (function () {

  
  const details = function(path) {
    return $.ajax({
      type: 'GET',
      dataType: 'json',
      url: path
    });
  };
  
  const search = function(path, query) {
    return $.ajax({
      type: 'GET',
      dataType: 'json',
      url: path,
      data: query
    });
  };

  const create = function(path, obj) {
    return $.ajax({
      type: 'POST',
      url: path,
      contentType: 'application/json',
      dataType: 'json',
      //processData: false,
      data: JSON.stringify(obj)
    });
  };

  const update = function (path, obj) {
    return $.ajax({
      type: 'PUT',
      url: path,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj)
    });
  };

  const remove = function(path) {
    return $.ajax({
      type: 'DELETE',
      url: path,
      dtatType: 'json'
    });
  };
 

  return {
    search, 
    details,
    create, 
    update,
    remove
  };

}());