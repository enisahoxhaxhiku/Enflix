using Enflix.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace Enflix.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class SerialiController : ControllerBase
    {


        public IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public SerialiController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {

            string query = @"select S.SerialiID, S.Titulli , S.NrSezonave , S.PershkrimiS , S.Foto_S ,S.AktortSId, S.ProducentiSID ,S.RegjisoriSID ,S.SkenaristatSId , K.Kategoria FROM Seriali S INNER JOIN Kategorite_Serialit K ON K.KategoriaSID=S.KategoriaSID";
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




        [HttpGet("sezonat/{id}")]
        public JsonResult Get(int id)
        {


            string query = @" SELECT S.SerialiID,S.Titulli,S.NrSezonave,S.Foto_S,S.Data_PostimitS,S.PershkrimiS
	 ,K.Kategoria,A.AktortSId,A.Emri,A.Mbiemri,P.ProducentiSID,P.Emri,P.Mbiemri,R.RegjisoriSID,R.Emri,R.Mbiemri
	 ,SK.SkenaristatSId,SK.Emri,SK.Mbiemri
	 FROM Seriali S
	 INNER JOIN Aktort_Serialit A
	 ON S.AktortSId=A.AktortSId
	 INNER JOIN Producentet_Serialit P
	 ON S.ProducentiSID=P.ProducentiSID
	 INNER JOIN Regjisoret_Serialit R
	 ON S.RegjisoriSID=R.RegjisoriSID
	 INNER JOIN Skenaristet_Serialit SK
	 ON S.SkenaristatSId=SK.SkenaristatSId
	 INNER JOIN Kategorite_Serialit K
	 ON S.KategoriaSID=K.KategoriaSID

	 WHERE S.SerialiID =
"+id+@"";

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
        [HttpGet("Kategoria/{id}")]
        public JsonResult GetKategoria(int id)
        {
            string query = @"select S.SerialiID, S.Titulli , S.NrSezonave , S.PershkrimiS , S.Foto_S ,S.AktortSId, S.ProducentiSID ,S.RegjisoriSID ,S.SkenaristatSId , K.Kategoria FROM Seriali S INNER JOIN Kategorite_Serialit K ON K.KategoriaSID=S.KategoriaSID where S.KategoriaSID = " + id + @"";

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
        public JsonResult Post(Seriali ser)
        {
            string query = @"insert into Seriali values ('" + ser.Titulli + @"', '" + ser.NrSezonave + @"', '" + ser.Data_PostimitS + @"', '" + ser.PershkrimiS+ @"', '" + ser.Foto_S + @"', '" + ser.AktortSId +  @"', '" + ser.ProducentiSID + @"', '" + ser.RegjisoriSID + @"' , '" + ser.SkenaristatSId  + @"', '" + ser.KategoriaSID + @"')";

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
            return new JsonResult("Eshte shtuar me sukses.");
        }




        [HttpPut]
        public JsonResult Put(Seriali ser)
        {
            string query = @"Update  Seriali set Titulli = '" + ser.Titulli + @"',NrSezonave = '" + ser.NrSezonave + @"',Data_PostimitS= '" + ser.Data_PostimitS + @"',PershkrimiS =  '" + ser.PershkrimiS + @"',Foto_S = '" + ser.Foto_S + @"',AktortSId = '" + ser.AktortSId + @"',ProducentiSID = '" + ser.ProducentiSID + @"',RegjisoriSID = '" + ser.RegjisoriSID + @"' ,SkenaristatSId = '" + ser.SkenaristatSId + @"',KategoriaSID = '" + ser.KategoriaSID + @"'WHERE SerialiID = " + ser.SerialiID + @"";
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
            return new JsonResult("Eshte ndryshuar me sukses.");
        }

        [HttpDelete("{serid}")]
        public JsonResult Delete(int serid)
        {
            string query = @"delete from Seriali where SerialiID= " + serid + @"";

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
            return new JsonResult("Eshte fshire me sukses.");
        }

        [Route("SaveFotoSeriali")]
        [HttpPost]
        public JsonResult SaveFotoSeriali()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/PhotosSeriali/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("pro.png");
            }
        }


        [HttpGet("{seid}")]
        public JsonResult GetSezonat(int seid)
        {
            string query = @"select SZ.SezonaID, SZ.NrSezones from Seriali S INNER JOIN SerialiSezona SS ON S.SerialiID = SS.SerialiID INNER JOIN Sezona SZ ON SZ.SezonaID=SS.SezonaID where S.SerialiID = " + seid + @"";

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


        [HttpGet("{sezid}/episodat")]
        public JsonResult GetEpisodat(int sezid)
        {
            string query = @"SELECT SZ.SezonaID,E.NrEpisodes ,E.EpisodaID, S.Foto_S, E.Titulli FROM Seriali S INNER JOIN SerialiSezona SS ON S.SerialiID=SS.SerialiID INNER JOIN Sezona SZ ON SS.SezonaID=SZ.SezonaID INNER JOIN SezonaEpisodi SE ON SZ.SezonaID=SE.SezonaID INNER JOIN Episoda E ON SE.EpisodaID=E.EpisodaID WHERE SZ.SezonaID = " + sezid + @"";
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


        [HttpGet("{eppid}/episoda")]
        public JsonResult GetEpisoden(int eppid)
        {
            string query = @"SELECT S.SerialiID,SZ.SezonaID,E.NrEpisodes ,E.PershkrimiE,E.Linku, E.Titulli FROM Seriali S INNER JOIN SerialiSezona SS ON S.SerialiID=SS.SerialiID INNER JOIN Sezona SZ ON SS.SezonaID=SZ.SezonaID INNER JOIN SezonaEpisodi SE ON SZ.SezonaID=SE.SezonaID INNER JOIN Episoda E ON SE.EpisodaID=E.EpisodaID WHERE SE.EpisodaID= " + eppid + @"";
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
