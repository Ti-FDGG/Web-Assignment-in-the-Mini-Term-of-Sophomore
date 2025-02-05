firework({
  "excludeElements": ["a"],
  "particles": [
    {
      "shape": "polygon",
      "move": ["diffuse","rotate"],
      "easing": "easeOutExpo",
      "colors": ["#FFF"],
      "number": 1,
      "duration": [1200, 1800],
      "shapeOptions": {
        "radius": 20,
        "alpha": 0.5,
        "lineWidth": 6,
        "sides": 5
      }
    },
    {
      "shape": "star",
      "move": ["diffuse","rotate"],
      "easing": "easeOutExpo",
      "colors": ["#FFF"],
      "number": 1,
      "duration": [1200, 1800],
      "shapeOptions": {
        "radius": 20,
        "alpha": 0.5,
        "lineWidth": 6,
        "spikes": 5
      }
    },
    {
      "shape": "circle",
      "move": ["diffuse","rotate"],
      "easing": "easeOutExpo",
      "colors": ["#FFF"],
      "number": 1,
      "duration": [1200, 1800],
      "shapeOptions": {
        "radius": 20,
        "alpha": 0.5,
        "lineWidth": 6
      }
    }
  ]
});