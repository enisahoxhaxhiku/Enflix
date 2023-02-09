using Enflix.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;


namespace Enflix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SerialiSezonaController : ControllerBase
    {



        private IConfiguration _configuration;

        public SerialiSezonaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }



        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT S.SerialiID,S.SezonaID,SZ.NrSezones FROM SerialiSezona S INNER JOIN Sezona SZ on S.SezonaID=SZ.SezonaID ";

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


        public JsonResult Post(SerialiSezona ss)
        {
            string query = "INSERT into SerialiSezona values (' " + ss.SerialiID + "','" + ss.SezonaID + @"')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");
            SqlDataReader reader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    reader = myCommand.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    myCon.Close();
                }

            }

            return new JsonResult("Shtuar me sukses!");
        }


        [HttpDelete("{ssID}")]

        public new JsonResult Delete(int ssID)
        {

            string query = @"delete from SerialiSezona where SezonaID= " + ssID + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");
            SqlDataReader reader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    reader = myCommand.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Fshire me sukses!");

        }





    }
}
