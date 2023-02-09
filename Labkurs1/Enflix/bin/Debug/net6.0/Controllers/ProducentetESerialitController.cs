using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Enflix.Models;

namespace Enflix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProducentetESerialitController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public ProducentetESerialitController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {

            string query = @"select ProducentiSID ,Emri , Mbiemri ,Biografia from Producentet_Serialit";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            SqlDataReader prodSReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodSReader = myCommand.ExecuteReader();
                    table.Load(prodSReader);

                    prodSReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);



        }


        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"select * from Producentet_Serialit where ProducentiSID = " + id + @"";

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

        public JsonResult Post(ProducentetESerialit p)
        {
            string query = @"insert into Producentet_Serialit values ('" + p.Emri + @"','" + p.Mbiemri + @"','"
                + p.Biografia + @"')";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            SqlDataReader prodSReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodSReader = myCommand.ExecuteReader();
                    table.Load(prodSReader);

                    prodSReader.Close();
                    myCon.Close();

                }

            }
            return new JsonResult("Eshte shtuar me sukses!");
        }




        [HttpPut]

        public JsonResult Put(ProducentetESerialit p)
        {

            string query = @"update Producentet_Serialit set Emri = '" + p.Emri + @"', Mbiemri ='" + p.Mbiemri + @"', Biografia = '" + p.Biografia
                + @"'where ProducentiSID = " + p.ProducentiSID + @"";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            SqlDataReader prodSReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodSReader = myCommand.ExecuteReader();
                    table.Load(prodSReader);

                    prodSReader.Close();
                    myCon.Close();

                }


            }
            return new JsonResult("Eshte ndryshuar me sukses!");


        }

        [HttpDelete("{pID}")]

        public JsonResult Delete(int pID)
        {
            string query = @"delete from Producentet_Serialit where ProducentiSID = " + pID + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            SqlDataReader prodSReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodSReader = myCommand.ExecuteReader();
                    table.Load(prodSReader);

                    prodSReader.Close();
                    myCon.Close();
                }

            }

            return new JsonResult("Fshire me sukses!");



        }

    }
}
