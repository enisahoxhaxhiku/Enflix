using Enflix.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace Enflix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegjisoretESerialitController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RegjisoretESerialitController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select RegjisoriSID , Emri , Mbiemri , Biografia from Regjisoret_Serialit";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            SqlDataReader regjisReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    regjisReader = cmd.ExecuteReader();
                    table.Load(regjisReader);

                    regjisReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"select * from Regjisoret_Serialit where RegjisoriSID = " + id + @"";

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
        

        [HttpPost]

        public JsonResult Post(RegjisoretESerialit regj)
        {
            string query = @"insert into Regjisoret_Serialit values ('" + regj.Emri + @"','" + regj.Mbiemri + @"','" + regj.Biografia + @"')";

            DataTable table = new DataTable();
            SqlDataReader regjisReader;

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    regjisReader = cmd.ExecuteReader();
                    table.Load(regjisReader);
                    regjisReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Shtuar me sukses");
        }
        [HttpPut]

        public JsonResult Put(RegjisoretESerialit regj)
        {

            string query = @"update Regjisoret_Serialit set Emri = '" + regj.Emri + @"', Mbiemri = '" + regj.Mbiemri + @"', Biografia = '" + regj.Biografia + @"'where RegjisoriSID = " + regj.RegjisoriSID + @"";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            SqlDataReader regjisReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    regjisReader = myCommand.ExecuteReader();
                    table.Load(regjisReader);
                    regjisReader.Close();
                    myCon.Close();


                }
            }
            return new JsonResult("Ndryshuar me sukses!");
        }

        [HttpDelete("{regjID}")]

        public new JsonResult Delete(int regjID)
        {

            string query = @"delete from Regjisoret_Serialit where RegjisoriSID = " + regjID + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");
            SqlDataReader regjisReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    regjisReader = myCommand.ExecuteReader();
                    table.Load(regjisReader);
                    regjisReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Fshire me sukses!");

        }
    }
}
