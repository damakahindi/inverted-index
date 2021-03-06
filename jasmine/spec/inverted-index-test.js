'use strict';

describe('Index', function() {

  var index = new Index();

  describe('Read book data', function() {


    it('should check if an Invalid Argument is passed', function() {
      expect(index.createIndex()).toBe(null);
    });

    it('should check if the file passed is a valid file', function(done) {

      index.createIndex('/test').catch(function(err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.toString()).toEqual('Error: Not Found');
        done();
      });

    });


    it('should check if the file passed is a valid JSON and not empty', function(done) {

      index.createIndex('/emptyBook.json').catch(function(err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.toString()).toEqual('SyntaxError: Unexpected end of JSON input');
        done();
      });
    });


  });

  describe('Populate Index', function() {
    it('should assert that the Index is created after the json is read', function(done) {
      expect(index.getIndex()).toBe(null);

      index.createIndex('/books.json').then(function(result) {
        expect(result).toBe(true);
        done();
      });
    });


    it('should read the JSON file and assert its not empty ', function(done) {
      index.readJson('/books.json').then(function(response) {
        expect(response).toBeTruthy();
        done();
      });
    });


  });

  describe('Search index', function() {
    beforeEach(function(done) {
      index.createIndex('/books.json').then(function() {
        done();
      })
    });

    it('should ensure it returns an array', function() {
      expect
      expect(Array.isArray(index.searchIndex('alice'))).toBeTruthy();
    });

    it('should return null if not a string passed.', function() {
      expect(index.searchIndex()).toBe(null);
      expect(index.searchIndex(1)).toBe(null);
      expect(index.searchIndex(1.67)).toBe(null);
      expect(index.searchIndex(true)).toBe(null);
    });

    it('should return -No such word found- if a string not in the books was passed.', function() {
      expect(index.searchIndex('searchterm')).toBe(null);
      expect(index.searchIndex('hellterm')).toBe(null);
      expect(index.searchIndex('hallo')).toBe(null);
      expect(index.searchIndex('Esther.')).toBe(null);
    });

    it('should verify that the right word is put in the right place', function() {
      expect(index.searchIndex('alice')).toEqual([0]);
      expect(index.searchIndex('Wonderland')).toEqual([0]);
      expect(index.searchIndex('unusual')).toEqual([1]);
      expect(index.searchIndex('Lord ')).toEqual([1]);
      expect(index.searchIndex('elf')).toEqual([1]);
      expect(index.searchIndex('dwarf.')).toEqual([1]);
    });
  });


});
