
const activities = [
  {
    name: 'Pilates',
    description: 'Los ejercicios de Pilates Mat buscan mejorar la fuerza abdominal, flexibilidad y control corporal. Algunos de sus principios básicos son: control, fluidez en el movimiento, precisión y respiración. Y sus principales beneficios pasan por aumentar la fuerza muscular, concentración y relajación.',
    imageUrl: '../../../assets/activities/pilates.jpg',
    events: [
      {
        activityName: 'Pilates',
        startHour: 9,
        endHour: 10,
        dayOfWeek: 1,
      },
      {
        activityName: 'Pilates',
        startHour: 9,
        endHour: 10,
        dayOfWeek: 2,
      },
      {
        activityName: 'Pilates',
        startHour: 9,
        endHour: 10,
        dayOfWeek: 3,
      },
      {
        activityName: 'Pilates',
        startHour: 9,
        endHour: 10,
        dayOfWeek: 4,
      }
    ]
  },
  {
    name: 'Boxeo',
    description: 'El Boxeo es un deporte de contacto en el cual se enfrentan dos individuos que lucharán únicamente con sus puños enfundados en unos guantes especiales con los cuales se golpearán y cuya principal condición será golpear al contrario por encima de la cintura dentro de un cuadrilátero que se encuentra especialmente diseñado para tal fin.',
    imageUrl: '../../../assets/activities/boxing.jpg',
    events: [
      {
        activityName: 'Pilates',
        startHour: 19,
        endHour: 20,
        dayOfWeek: 1,
      },
      {
        activityName: 'Pilates',
        startHour: 19,
        endHour: 20,
        dayOfWeek: 2,
      },
    ]
  },
];

const activities2 = [
  {
    name: 'Body Combat2',
    description: 'Descarga tu adrenalina con esta actividad cardiovascular que utiliza movimientos de artes marciales, como el kick boxing o el taekwondo. Pondrás en funcionamiento todos los grupos musculares y trabajarás la flexibilidad, la fuerza y la resistencia, además de liberar estrés y bajar de peso. ¡Tus puños y piernas no van a parar!',
    imageUrl: '../../../assets/activities/bodycombat.jpg',
    events: []
  },
  {
    name: 'TRX2',
    description: 'Actividad guiada con una duración de 30´. Es un sistema de entrenamiento en suspensión que desarrolla la fuerza funcional al mismo tiempo que se mejora la flexibilidad, el equilibrio, y la estabilidad de la parte central (core) del cuerpo, mejorando cualidades físicas que te exigen cualquier actividad deportiva y en la vida cotidiana, y que está compuesto por una serie de movimientos y ejercicios',
    imageUrl: '../../../assets/activities/trx.jpg',
    events: [],
  }];

const Activity = require('../models/activity.js');
const Event = require('../models/event.js');

exports.getActivities = (req, res, next) => {
  const getQuery = Activity.find();
  getQuery.then((activities) => {
    res.status(200).json({
      message: "Activities fetched successfully!",
      activities,
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching activities failed!"
    });
  });
}

exports.getAllEvents = (req, res, next) => {
  console.log("llego");
  const getQuery = Event.find();
  getQuery.then((events) => {
    res.status(200).json({
      message: "Events fetched successfully!",
      events,
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching events failed!"
    });
  });
}

  // activities.forEach((activity) => {
  //   const events = activity.events.map((event) => {
  //     return new Event({
  //       activityName: event.activityName,
  //       startHour: event.startHour,
  //       endHour: event.endHour,
  //       dayOfWeek: event.dayOfWeek,
  //     })
  //   })
  //   const act = new Activity({
  //     name: activity.name,
  //     description: activity.description,
  //     imageUrl: activity.imageUrl,
  //     events,
  //   })
  //   act.save().then((savedActivity) => {
  //     console.log(savedActivity);
  //   }).catch((error) => {
  //     console.log(error);
  //   })
  // }) 