using Enflix.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace Enflix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SezonaEpisodiController : ControllerBase
    {

        private IConfiguration _configuration;

        public SezonaEpisodiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }



        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT SE.SezonaID,SE.EpisodaID ,E.NrEpisodes FROM SezonaEpisodi SE INNER JOIN Episoda E ON SE.EpisodaID=E.EpisodaID";

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


        public JsonResult Post(SezonaEpisodi se)
        {
            string query = "INSERT into SezonaEpisodi values (' " + se.SezonaID + "','" + se.EpisodaID +  @"')";
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

        [HttpDelete("{seID}")]

        public new JsonResult Delete(int seID)
        {

            string query = @"delete from SezonaEpisodi where EpisodaID= " + seID + @"";

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
