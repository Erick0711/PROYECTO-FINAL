using backend.connection;
using backend.entity;
using backend.services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace backend.Controllers;
// tener en cuentra que debes hacer uso del AspNetCore.Cors
[EnableCors("CorsDev")]

[ApiController]
[Route("api/[controller]")]
public class PersonController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string? connectionString;


    public PersonController(IConfiguration configuration)
    {
        _configuration = configuration;
        connectionString = _configuration["SqlConnectionString:DefaultConnection"];
        BDManager.GetInstance.ConnectionString = connectionString;
    }

    [HttpGet]
    [Route("GetAllPerson")]
    public IActionResult GetAllPerson()
    {
        try
        {
            var result = PersonServices.GetAll<Person>();
            return Ok(result);
        }
        catch (Exception err)
        {
            return StatusCode(500, err.Message);
        }
    }

    
    [HttpGet]
    [Route("GetPersonById")]
    public IActionResult GetPersonById([FromQuery] int id)
    {
        try
        {
            var result = PersonServices.GetById<Person>(id);
            return Ok(result);
        }
        catch (Exception err)
        {
            return StatusCode(500, err.Message);
        }
    }

    [HttpPost]
    [Route("AddPerson")]
    public IActionResult AddUser(Person person)
    {
        try
        {
            var result = PersonServices.Insert(person);
            return Ok(result);
        }
        catch (Exception err)
        {
            return StatusCode(500, err.Message);
        }
    }

    [HttpPut]
    [Route("EditPerson")]
    public IActionResult EditPerson(Person person)
    {
        try
        {
            var result = PersonServices.Update(person);
            return Ok(result);
        }
        catch (Exception err)
        {
            return StatusCode(500, err.Message);
        }
    }

    [HttpPut]
    [Route("DeletePerson")]
    public IActionResult DeletePerson([FromQuery] int id)
    {
        try
        {
            var recordsAffected = PersonServices.Delete(id);
            if (recordsAffected > 0)
            {
                return Ok("Se dio de baja a la persona correctamente.");
            }
            else
            {
                return BadRequest("No se pudo dar de baja a la persona.");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
