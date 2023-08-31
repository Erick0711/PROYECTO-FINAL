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
public class RolController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string? connectionString;


    public RolController(IConfiguration configuration)
    {
        _configuration = configuration;
        connectionString = _configuration["SqlConnectionString:DefaultConnection"];
        BDManager.GetInstance.ConnectionString = connectionString;
    }

    [HttpGet]
    [Route("GetAllRol")]
    public IActionResult GetAllRol()
    {
        try
        {
            var result = RolServices.GetAll<Rol>();
            return Ok(result);
        }
        catch (Exception err)
        {
            return StatusCode(500, err.Message);
        }
    }

    
    [HttpGet]
    [Route("GetRolById")]
    public IActionResult GetRolById([FromQuery] int id)
    {
        try
        {
            var result = RolServices.GetById<Rol>(id);
            return Ok(result);
        }
        catch (Exception err)
        {
            return StatusCode(500, err.Message);
        }
    }

    [HttpPost]
    [Route("AddRol")]
    public IActionResult AddRol(Rol rol)
    {
        try
        {
            var result = RolServices.Insert(rol);
            return Ok(result);
        }
        catch (Exception err)
        {
            return StatusCode(500, err.Message);
        }
    }

    [HttpPut]
    [Route("EditRol")]
    public IActionResult EditPerson(Rol rol)
    {
        try
        {
            var result = RolServices.Update(rol);
            return Ok(result);
        }
        catch (Exception err)
        {
            return StatusCode(500, err.Message);
        }
    }

    [HttpPut]
    [Route("DeleteRol")]
    public IActionResult DeletePerson([FromQuery] int id)
    {
        try
        {
            var recordsAffected = RolServices.Delete(id);
            if (recordsAffected > 0)
            {
                return Ok("Se dio de baja al rol correctamente.");
            }
            else
            {
                return BadRequest("No se pudo dar de baja al rol.");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
