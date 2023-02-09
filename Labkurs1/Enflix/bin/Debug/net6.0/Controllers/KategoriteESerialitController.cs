using Enflix.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
namespace Enflix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KategoriteESerialitController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public KategoriteESerialitController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select KategoriaSID, Kategoria from Kategorite_Serialit";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            SqlDataReader kategoriteReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    kategoriteReader = cmd.ExecuteReader();
                    table.Load(kategoriteReader);

                    kategoriteReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]

        public JsonResult Post(KategoriteESerialit kategorite)
        {
            string query = @"insert into Kategorite_Serialit values ('" + kategorite.Kategoria + @"')";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            SqlDataReader kategoriteReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    kategoriteReader = cmd.ExecuteReader();
                    table.Load(kategoriteReader);
                    
                    kategoriteReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Shtuar me sukses!");

        }


        [HttpPut]

        public JsonResult Put(KategoriteESerialit kategorite)
        {
            string query = @"update Kategorite_Serialit set Kategoria = '" + kategorite.Kategoria + @"' where KategoriaSID = " + kategorite.KategoriaSID + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            SqlDataReader kategoriteReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    kategoriteReader = cmd.ExecuteReader();
                    table.Load(kategoriteReader);

                    kategoriteReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Ndryshuar me sukses!");
        }

        [HttpDelete("{kID}")]

        public JsonResult Delete(int kID) {

            string query = @"delete from Kategorite_Serialit where KategoriaSID = " + kID + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            SqlDataReader kategoriteReader;

            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using(SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    kategoriteReader=cmd.ExecuteReader();
                    table.Load(kategoriteReader);

                    kategoriteReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Fshire me sukses");
        
        }




    }
}
