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
public class UsersController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string? connectionString;


    public UsersController(IConfiguration configuration)
    {
        _configuration = configuration;
        connectionString = _configuration["SqlConnectionString:DefaultConnection"];
        BDManager.GetInstance.ConnectionString = connectionString;
    }

    [HttpGet]
    [Route("GetAllUsers")]
    public IActionResult GetAllUsers()
    {
        try
        {
            var result = UsersServices.GetAll<Users>();
            return Ok(result);
        }
        catch (Exception err)
        {
            return StatusCode(500, err.Message);
        }
    }

    
    [HttpGet]
    [Route("GetUsersById")]
    public IActionResult GetUsersById([FromQuery] int id)
    {
        try
        {
            var result = UsersServices.GetById<Users>(id);
            return Ok(result);
        }
        catch (Exception err)
        {
            return StatusCode(500, err.Message);
        }
    }

    [HttpPost]
    [Route("AddUsers")]
    public IActionResult AddUsers(Users user)
    {
        try
        {
            var result = UsersServices.Insert(user);
            return Ok(result);
        }
        catch (Exception err)
        {
            return StatusCode(500, err.Message);
        }
    }

    [HttpPut]
    [Route("EditUsers")]
    public IActionResult EditUsers(Users user)
    {
        try
        {
            var result = UsersServices.Update(user);
            return Ok(result);
        }
        catch (Exception err)
        {
            return StatusCode(500, err.Message);
        }
    }

    [HttpPut]
    [Route("DeleteUsers")]
    public IActionResult DeleteUsers([FromQuery] int id)
    {
        try
        {
            var recordsAffected = UsersServices.Delete(id);
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
