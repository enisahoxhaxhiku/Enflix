using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Enflix.Models;
namespace Enflix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EpisodaController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public EpisodaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]

        public JsonResult Get()
        {

            string query = @"select  EpisodaID , Titulli , NrEpisodes , PershkrimiE,Linku from Episoda";
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


        [HttpPost]

        public JsonResult Post(Episoda e)
        {
            string query = @"insert into Episoda values ('" + e.Titulli + @"','" + e.NrEpisodes + @"','" + e.PershkrimiE + @"','" + e.Linku+ @"')";

            DataTable table = new DataTable();
            SqlDataReader Reader;

            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    Reader = cmd.ExecuteReader();
                    table.Load(Reader);
                    Reader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Shtuar me sukses");
        }



        [HttpPut]

        public JsonResult Put(Episoda e)
        {

            string query = @"update Episoda set Titulli= '" + e.Titulli+ @"', NrEpisodes= '" + e.NrEpisodes+ @"', PershkrimiE= '" + e.PershkrimiE + @"', Linku= '" + e.Linku+ @"'where EpisodaID= " + e.EpisodaID+ @"";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");

            SqlDataReader Reader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    Reader = myCommand.ExecuteReader();
                    table.Load(Reader);

                    Reader.Close();
                    myCon.Close();


                }
            }
            return new JsonResult("Ndryshuar me sukses!");



        }



        [HttpDelete("{eID}")]

        public new JsonResult Delete(int eID)
        {

            string query = @"delete from Episoda where EpisodaID= " + eID + @"";

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
