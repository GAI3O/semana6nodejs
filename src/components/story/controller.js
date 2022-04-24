// Esto va a actuar como si fuera una base de local
// en verdad es un array de objetos

import { prisma } from "../../db";

/*
let stories = [
  {
    id: 1,
    name: "Harry Potter",
    author: "J.K. Rowling",
    image:
      "https://phantom-marca.unidadeditorial.es/70cdeb1501a33c2c567dabbebc270ddd/resize/1320/f/jpg/assets/multimedia/imagenes/2021/11/17/16371568440299.jpg",
    description:
      "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles (non-magical people) worldwide.",
  },
];
 
 Vamos a enviarle al cliente el siguiente
 en res podemos el statis res.status(200).json()
  {
    ok: // true || false esto va a indicar y si la peticion es success o error
    data: // Sera el cuerpo de nuestra respuesta esto va a tener un mensaje con los datos o un mensaje de error
  }
 */

// Listar
// METHOD: GET
export const list = async (req, res) => {
  // lista los stories
  try{
    const stories = await prisma.story.findMany();
    
    return res.status(200).json({
      ok: true,
      data: stories,
    });
  }catch(error){
    return res.status(500).json({
      ok: false,
      data: error.message,
    });
  }
  
};

// Crear
// METHOD: POST
export const store = async (req, res) => {
  // crea un story
  // note: Recurden que el estado de creacion es 201
  try{
    const story = await prisma.story.create({
      data:{...req.body},
    });

    return res.status(201).json({
      ok: true,
      data: story,
    });
  }catch(error){
    return res.status(500).json({
      ok: false,
      data: error.message,
    });
    
  }

  
};

// Editar
// METHOD: PUT
export const update = async (req, res) => {
  // edita un story
  try{
    const { id } = req.params;

    const story = await prisma.story.update({
      where: { id: Number(id) },
      data: { ...req.body },
    })

    return res.status(200).json({
      ok:true,
      data:story,
    });
  }catch(error){
    return res.status(500).json({
      ok:false,
      data:error.message,
    });
  }
};

// Eliminar
// METHOD: DELETE
export const destroy = async (req, res) => {
  // elimina un story
  // para eliminar un elemento de un array de objetos
  // podemos usar filter
  try{
    const { id } = req.params;

    await prisma.story.delete({
      where:{id:Number(id)},
    })
    return res.status(200).json({
      ok: true,
      data: "Story deleted",
    });
  }catch(error){
    return res.status(500).json({
      ok: false,
      data: error.message,
    });
  }
  
  
};
