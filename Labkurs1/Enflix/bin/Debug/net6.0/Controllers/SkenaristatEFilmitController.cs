using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Enflix.Models;

namespace Enflix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkenaristatEFilmitController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public SkenaristatEFilmitController(IConfiguration configuration)
        { 
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select SkenaristatId, Emri, Mbiemri, Biografia from Skenaristet_Filmit";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");
            SqlDataReader skenarReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    skenarReader = cmd.ExecuteReader();
                    table.Load(skenarReader); ;

                    skenarReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(SkenaristatEFilmit ske)
        {
            string query = @"insert into Skenaristet_Filmit values ('"+ ske.Emri + @"','" + ske.Mbiemri + @"','" + ske.Biografia + @"')";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");
            SqlDataReader skenarReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    skenarReader = cmd.ExecuteReader();
                    table.Load(skenarReader); ;

                    skenarReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Shtuar me sukses");
        }


        [HttpPut]
        public JsonResult Put(SkenaristatEFilmit ske)
        {
            string query = @"update Skenaristet_Filmit set Emri = '" + ske.Emri + @"', Mbiemri = '" + ske.Mbiemri + @"', Biografia = '" + ske.Biografia + @"'where SkenaristatId = " + ske.SkenaristatId + @"";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");
            SqlDataReader skenarReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    skenarReader = myCommand.ExecuteReader();
                    table.Load(skenarReader); ;

                    skenarReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Ndryshuar me sukses!");
        }


        [HttpDelete("{skeID}")]
        public JsonResult Delete(int skeID)
        {
            string query = @"delete from Skenaristet_Filmit where SkenaristatId = " + skeID + @"";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");
            SqlDataReader skenarReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    skenarReader = myCommand.ExecuteReader();
                    table.Load(skenarReader); 

                    skenarReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Fshire me sukses!");
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"select * from Skenaristet_Filmit where SkenaristatId = " + id + @"";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
    }
}
