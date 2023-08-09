ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map(
    "map",
    {
      center: [55.795469, 37.933977],
      controls: [],
      zoom: 14,
    },
    {}
  );
  var myPlacemark = new ymaps.Placemark(
    [55.794831, 37.92264],
    {
      hintContent: "Компьютерный мастер в Балашихе",
      iconCaption: "Компьютерный мастер",
    },
    {
      preset: "islands#redDotIcon",
    }
  );
  myMap.geoObjects.add(myPlacemark);
}
