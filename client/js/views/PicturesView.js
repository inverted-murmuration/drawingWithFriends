//PicturesView.js
//TODO this file is pretty bad

var app = app || {};

app.PicturesView = Backbone.View.extend({
  //el : $('ul.gallery-list'),
  tagName: 'ul',
  collection : app.PicturesCollection,

  generatePhrase: function() {
    var firstWord = ['so', 'wow', 'such', 'much', 'amazing', 'brilliant', 'wonderful', 'very'];
    var secondWord = ['drawing', 'painting', 'masterpiece', 'art', 'genius', 'abstract', 'impressionism', 'passion', 'da Vinci', 'Picasso'];

    return _.sample(firstWord) + ' ' + _.sample(secondWord) + '.';
  },

  generateColor: function() {
    var colors = ['red'];
    return _.sample(color);
  },

  svgLine: d3.svg.line()
  .x(function(d) { return d[0]; })
  .y(function(d) { return d[1]; })
  .interpolate('basis'),

  initialize : function() {
    $('.container').text('loading...');
    this.collection.on('processed', this.render, this);

  },
  render : function () {
    $('.container').empty();

    //var ul = d3.select(el);
    var ul = d3.select('.container'); //TODO eww
    var pictures = this.collection.modelData;
    var pic_ids = Object.keys(pictures).reverse();
    _.each(pic_ids, function(pic_id) {
      var li = ul.append('li')
      var svg = li.append('svg')
        .attr({
          'class': 'canvas',
          width: 500,
          height: 500
        });
      
      li.append('h2').text(this.generatePhrase())
                     .style({
                      'color' : this.generateColor()
                     });

      var picture = pictures[pic_id];
      _.each(picture, function(line) {
        //console.log(JSON.parse(line));
        var line = svg.append('path')
        .datum(JSON.parse(line))
        .attr('class', 'line');
        line.attr('d', this.svgLine);
      }, this);
    }, this);

    //$('.container').append($el);
  }
});
