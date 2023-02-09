using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Enflix.Models;


namespace Enflix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegjisoretEFilmitController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public RegjisoretEFilmitController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select RegjisoriFID , Emri , Mbiemri , Biografia from Regjisoret_Filmit";

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
        public JsonResult Get(int id) {
            string query = @"Select * from Regjisoret_Filmit where RegjisoriFID = " +id+@"";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");
            SqlDataReader reader;
            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand cmd = new SqlCommand(query, myCon)) { 
                   reader=cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]

        public JsonResult Post(RegjisoretEFilmit r)
        {
            string query = @"insert into Regjisoret_Filmit values ('" + r.Emri + @"','" + r.Mbiemri + @"','" + r.Biografia + @"')";

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

        public JsonResult Put(RegjisoretEFilmit r)
        {

            string query = @"update Regjisoret_Filmit set Emri = '" + r.Emri + @"', Mbiemri = '" + r.Mbiemri + @"', Biografia = '" + r.Biografia + @"'where RegjisoriFID = " + r.RegjisoriFID + @"";

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

        [HttpDelete("{rID}")]

        public new JsonResult Delete(int rID) {

           string query = @"delete from Regjisoret_Filmit where RegjisoriFID = " + rID + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");
            SqlDataReader regjisReader;

            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand = new SqlCommand(query, myCon))
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