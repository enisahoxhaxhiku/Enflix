using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Enflix.Models;

namespace Enflix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProducentetEFilmitController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProducentetEFilmitController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {

            string query = @"select ProducentiID, Emri , Mbiemri , Biografia from Producentet_Filmit";
            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            SqlDataReader prodReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodReader = myCommand.ExecuteReader();
                    table.Load(prodReader);

                    prodReader.Close();
                    myCon.Close();
                }


            }
            return new JsonResult(table);
        }


        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"select * from Producentet_Filmit where ProducentiID = " + id + @"";

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

        public JsonResult Post(ProducentetEFilmit p)
        {

            string query = @"insert into Producentet_Filmit values 
                        ('" + p.Emri + @"','" + p.Mbiemri + @"','" + p.Biografia + @"')";
            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            SqlDataReader prodReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodReader = myCommand.ExecuteReader();
                    table.Load(prodReader);

                    prodReader.Close();
                    myCon.Close();
                }


            }
            return new JsonResult("Shtuar me sukses!");
        }


        [HttpPut]
        public JsonResult Put(ProducentetEFilmit p)
        {

            string query = @"update Producentet_Filmit set Emri = '" + p.Emri + @"', Mbiemri = '" + p.Mbiemri + @"',Biografia='" + p.Biografia + @"'where ProducentiID = " + p.ProducentiID + @"";
            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            SqlDataReader prodReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodReader = myCommand.ExecuteReader();
                    table.Load(prodReader);

                    prodReader.Close();
                    myCon.Close();
                }


            }
            return new JsonResult("Ndryshuar me sukses!");
        }
        [HttpDelete("{pID}")]
        public JsonResult Delete(int pID)
        {

            string query = @"delete from Producentet_Filmit where ProducentiID = " + pID + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            SqlDataReader prodReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodReader = myCommand.ExecuteReader();
                    table.Load(prodReader);

                    prodReader.Close();
                    myCon.Close();
                }


            }
            return new JsonResult("Fshire me sukses!");
        }

    }
}
