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
    public class SkenaristatESerialitController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public SkenaristatESerialitController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select SkenaristatSId, Emri, Mbiemri, Biografia from Skenaristet_Serialit";

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
        public JsonResult Post(SkenaristetESerialit ske)
        {
            string query = @"insert into Skenaristet_Serialit values ('" + ske.Emri + @"','" + ske.Mbiemri + @"','" + ske.Biografia + @"')";

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



        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"select * from Skenaristet_Serialit where SkenaristatSId = " + id + @"";

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
        [HttpPut]
        public JsonResult Put(SkenaristetESerialit ske)
        {
            string query = @"update Skenaristet_Serialit set Emri = '" + ske.Emri + @"', Mbiemri = '" + ske.Mbiemri + @"', Biografia = '" + ske.Biografia + @"'where SkenaristatSId = " + ske.SkenaristatSId + @"";

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
            string query = @"delete from Skenaristet_Serialit where SkenaristatSId = " + skeID + @"";

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

            return new JsonResult("Fshire me sukses!");
        }

    }
}
