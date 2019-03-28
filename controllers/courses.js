const courses = [
  {
    name: 'Defensa personal',
    description: 'La defensa personal es un conjunto de habilidades técnico-tácticas encaminadas a impedir o repeler una agresión, realizadas por uno mismo y para sí mismo.\nLas habilidades técnico-tácticas de la defensa personal deben ser eficaces para conseguir el objetivo de evitar o repeler la agresión\nPueden utilizarse todo tipo de recursos disponibles sin más límite que el marcado por la legislación. Resultando, de este modo, una materia multidisciplinar que contiene habilidades de las diversas artes marciales y militares, de los deportes de contacto y lucha, de otros tipos de lucha poco ortodoxas como la pelea callejera, así como de habilidades verbales.',
    imageUrl: '../../assets/courses/self-defense-2.png',
  },
  {
    name: 'Senderismo',
    description: 'El senderismo tiene múltiples beneficios para la salud. Permite quemar calorías porque requiere de un movimiento constante del cuerpo mientras caminamos. Además, favorece la salud cardiovascular y de las articulaciones.\nUn instructor dirigirá la actividad en todo momento y estará a disposición de los caminantes para ayudarles a optimizar su rendimiento. Además, podemos controlar la intensidad del ejercicio eligiendo rutas adaptadas a nuestras condiciones físicas.',
    imageUrl: '../../assets/courses/senderismo.jpg',
  },
  {
    name: 'Running',
    description: 'Tanto si eres un corredor experimentado como si quieres iniciarte en las carreras, tienes un lugar en el Club de Runners.\nLa programación de esta actividad está orientada a la participación en carreras populares. El Club de Runners pone a tu disposición un entrenador que te guiará y asesorará en la práctica de este deporte para que alcances los mejores resultados de forma individual y en grupo.\nAdemás, te mantendremos al día de todas las carreras populares que se organicen en tu ciudad para que puedas adquirir el reto de participar en cualquiera de ellas y superar tus marcas.',
    imageUrl: '../../assets/courses/running.jpg',
  },
  {
    name: 'Padel',
    description: 'En la actualidad el pádel se ha convertido en una práctica deportiva apta para todos los bolsillos, que permite pasar un rato en compañía de los amigos, ejercitando nuestro cuerpo y mejorando nuestra salud.\nAl tratarse de un deporte que se suele practicar con más de dos personas favorece las relaciones sociales a la vez que practicamos deporte, nos ponernos en forma y eliminamos tensiones y estrés diario.\nHemos diseñado una metodología para lograr una mejor asimilación por parte de los alumnos gracias a la combinación de diferentes técnicas de trabajo con ejercicios de aplicación y juegos para aprender las reglas más importantes.\nLas clases se organizan según el nivel de los alumnos, con varias repeticiones y variando el ritmo de trabajo.',
    imageUrl: '../../assets/courses/padel.jpg',
  }
];

const Course = require('../models/course.js');

exports.getCourses = (req, res, next) => {
  const getQuery = Course.find();
  getQuery.then((courses) => {
    res.status(200).json({
      message: "Courses fetched successfully!",
      courses,
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching courses failed!"
    });
  });
}

exports.deleteCourse = (req, res, next) => {
  const id = req.params.id;
  const deleteQuery = Course.deleteOne({_id: id});
  deleteQuery.then((result) => {
    if (result.n > 0) {
      res.status(200).json({
        message: "Course deleted successfully!",
      });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Course failed!"
    });
  });
}

exports.updateCourse = (req, res, next) => {
  const newCourse = req.body.course;
  const course = new Course({
    ...newCourse,
    _id: newCourse.id,
  })
  const putQuery = Course.updateOne({_id: course._id}, course);
  putQuery.then((result) => {
    if (result.n > 0) {
      res.status(200).json({
        message: "Course updated successfully!",
      });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Updating Course failed!"
    });
  });
}

exports.createCourse = (req, res, next) => {

  const course = new Course({
    ...req.body.course
  });
  course.save().then(result => {
    res.status(201).json({
      message: "Course created!",
      course: result
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "Credenciales no válidos"
    });
  });
}