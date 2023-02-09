using Enflix.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Authorization;

namespace Enflix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmatController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public FilmatController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select F.FilmatId, F.Titulli, F.Foto, F.Data_Postimit, F.Pershkrimi_Filmit, F.Linku_Filmit, K.Kategoria from Filmat F INNER JOIN Kategorit_Filmit K ON K.KategoriaFID = F.KategoriaID";

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
            string query = @"select F.FilmatId, F.Titulli, F.Foto, F.Data_Postimit, F.Pershkrimi_Filmit, F.Linku_Filmit, K.Kategoria from Filmat F INNER JOIN Kategorit_Filmit K ON K.KategoriaFID = F.KategoriaID where F.KategoriaID = " + id + @"";

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

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"select F.FilmatId, F.Titulli, F.Foto, F.Data_Postimit, 
                           F.Pershkrimi_Filmit, Linku_Filmit, K.Kategoria, A.AktortiFId, A.Emri, A.Mbiemri, P.ProducentiID, P.Emri, P.Mbiemri, R.RegjisoriFID, R.Emri, R.Mbiemri, S.SkenaristatId, S.Emri, S.Mbiemri
                           from Filmat F INNER JOIN Kategorit_Filmit K ON K.KategoriaFID = F.KategoriaID
                           INNER JOIN Aktort_Filmit A ON A.AktortiFId = F.AktoriID
                           INNER JOIN Producentet_Filmit P ON P.ProducentiID = F.ProducentiID
                           INNER JOIN Regjisoret_Filmit R ON R.RegjisoriFID = F.RegjisoriID
                           INNER JOIN Skenaristet_Filmit S ON S.SkenaristatId = F.SkenaristiID where FilmatId = " + id + @"";

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

       // [Authorize]
        [HttpPost]
        public JsonResult Post(Filmat fil)
        {
            string query = @"insert into Filmat values ('" + fil.Titulli + @"', '" + fil.Foto + @"', '" + fil.Data_Postimit + @"', '" + fil.Pershkrimi_Filmit + @"', '" + fil.Linku_Filmit + @"', '" + fil.AktoriID + @"', '" + fil.KategoriaID + @"', '" + fil.ProducentiID + @"' , '" + fil.RegjisoriID + @"', '" + fil.SkenaristiID + @"')";

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

       // [Authorize]
        [HttpPut]
        public JsonResult Put(Filmat fil)
        {
            string query = @"Update Filmat set Titulli = '" + fil.Titulli + @"', Foto = '" + fil.Foto + @"', Data_Postimit = '" + fil.Data_Postimit + @"', Pershkrimi_Filmit = '" + fil.Pershkrimi_Filmit + @"', Linku_Filmit = '" + fil.Linku_Filmit + @"', AktoriID = '" + fil.AktoriID + @"', KategoriaID = '" + fil.KategoriaID + @"', ProducentiID = '" + fil.ProducentiID + @"', RegjisoriID = '" + fil.RegjisoriID + @"', SkenaristiID = '" + fil.SkenaristiID + @"' where FilmatId = " + fil.FilmatId + @"";

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

        [Route("SaveFotoFilmi")]
        [HttpPost]
        public JsonResult SaveFotoFilmi()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/PhotosFilmi/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from Filmat where FilmatId = " + id + @"";

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
    }
}