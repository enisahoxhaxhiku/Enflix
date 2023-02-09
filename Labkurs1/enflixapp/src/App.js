import logo from "./logo.svg";
import "./App.css";

import { AktortEFilmit } from "./Admin/AktortEFilmit/AktortEFilmit";
import { ProducentetEFilmit } from "./Admin/ProducentetEFilmit/ProducentetEFilmit";
import { ProducentetESerialit } from "./Admin/ProducentetESerialit/ProducentetESerialit";
import { AktortESerialit } from "./Admin/AktortESerialit/AktortESerialit";
import { DetajetEAktoritTeFilmit } from "./Aktort/DetajetEAktoritTeFilmit";
import { DetajetEAktoritTeSerialit } from "./Aktort/DetajetEAktoritTeSerialit";
import { DetajetEProducenteveTeFilmit } from "./Producentet/DetajetEProducenteveTeFilmit";
import { DetajetEProducenteveTeSerialit } from "./Producentet/DetajetEProducenteveTeSerialit";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navigation } from "./Navigation/Navigation";
import { Dashboard } from "./Admin/Dashboard";
import { Footer } from "./Footer/Footer";
import { RegjisoretEFilmit } from "./Admin/RegjisoretEFilmit/RegjisoretEFilmit";
import { DetajetERegjisoreveTeFilmit } from "./Regjisoret/DetajetERegjisoreveTeFilmit";
import { KategoritEFilmit } from "./Admin/KategoritEFilmit/KategoritEFilmit";
import { KategoriteESerialit } from "./Admin/KategoriteESerialit/KategoriteESerialit";
import { RegjisoretESerialit } from "./Admin/RegjisoretESerialit/RegjisoretESerialit";
import { AktorFilmi } from "./Aktort/AktorFilmi";
import { PageNotFound } from "./PageNotFound/PageNotFound";
import { AktorSeriali } from "./Aktort/AktorSeriali";
import { DetajetERegjisoritTeSerialit } from "./Regjisoret/DetajetERegjisoritTeSerialit";
import { RegjisorSeriali } from "./Regjisoret/RegjisorSeriali";
import { Filmat } from "./Admin/Filmat/Filmat";
import { Seriali } from "./Admin/Seriali/Seriali";

import { RegjisorFilmi } from "./Regjisoret/RegjisorFilmi";
import { ProducentFilmi } from "./Producentet/ProducentFilmi";
import { ProducentSeriali } from "./Producentet/ProducentSeriali";
import { Filmi } from "./Filmat/Filmi";
import { DetajetEFilmit } from "./Filmat/DetajetEFilmit";

import { Sezona } from "./Admin/Sezona/Sezona";
import { Episoda } from "./Admin/Episoda/Episoda";
import { SezonaEpisodi } from "./Admin/SezonaEpisodi/SezonaEpisodi";
import { KategoritFilmit } from "./Filmat/KategoritFilmit";
import { KategoritSerialit } from "./Serialet/KategoritSerialit";
import { SerialiSezona } from "./Admin/SerialiSezona/SerialiSezona";
import { Serialet } from "./Serialet/Serialet";

import { DetajetESezones } from "./Serialet/DetajetESezones";
import { DetajetEEpisodave } from "./Serialet/DetajetEEpisodave";
import { DetajetEEpisodes } from "./Serialet/DetajetEEpisodes";
import { DetajetESerialit } from "./Serialet/DetajetESerialit";
import { Login } from "./Login/Login";
import { RegisterAdmin } from "./Admin/RegisterAdmin/RegisterAdmin";
import { RegisterAdminView } from "./Admin/RegisterAdmin/RegisterAdminView";
//import { Auth0Provider } from '@auth0/auth0-react';

import { Registers } from "./Register/Registers";
import { RrethNesh } from "./Admin/RrethNesh/RrethNesh";
import { RrethNeshsh } from "./RrethNesh/RrethNeshsh";
import { SkenaristetEFilmit } from "./Admin/SkenaristetEFilmit/SkenaristetEFilmit";
import { SkenaristFilmi } from "./Skenaristet/SkenaristFilmi";
import { DetajetESkenaristveTeFilmit } from "./Skenaristet/DetajetESkenaristveTeFilmit";
import{DergoMesazh} from "./Kontakti/DergoMesazh";
import{Kontakti} from "./Admin/Kontaktet/Kontakti";
import{DetajetEKontaktit} from "./Admin/Kontaktet/DetajetEKontaktit";
import{SkenaristetESerialit} from "./Admin/SkenaristetESerialit/SkenaristetESerialit";
import { SkenaristSeriali } from "./Skenaristet/SkenaristSeriali";
import {DetajetESkenaristveTeSerialit} from './Skenaristet/DetajetESkenaristveTeSerialit'
function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Switch>
        <Route path="/" component={Filmi} exact />
        <Route path="/Filmat" component={Filmat} exact />

         <Route path="/Serialet" component={Serialet} exact />
        
         <Route path="/dergomesazh" component={DergoMesazh} exact />
         <Route path="/skenaristeteserialit" component={SkenaristetESerialit} exact />
         <Route path="/kontakti" component={Kontakti} exact />
        <Route path="/Admin/registersAdmin" component={RegisterAdmin} exact />
        <Route path="/registersview" component={RegisterAdminView} exact />
        <Route path="/registers" component={Registers} exact />
        <Route path="/detajetefilmit/:id" component={DetajetEFilmit} exact />
        <Route
          path="/detajeteserialit/:id"
          component={DetajetESerialit}
          exact
        />
        <Route
          path="/detajetesezones/:seid"
          component={DetajetESezones}
          exact
        />
        <Route
          path="/detajeteepisodave/:sezid"
          component={DetajetEEpisodave}
          exact
        />
        <Route
          path="/detajeteepisodes/:eppid"
          component={DetajetEEpisodes}
          exact
        />
        <Route path="/Seriali" component={Seriali} exact />
        <Route path="/Episoda" component={Episoda} exact />
        <Route path="/Sezona" component={Sezona} exact />
        <Route path="/SezonaEpisodi" component={SezonaEpisodi} exact />
        <Route path="/SerialiSezona" component={SerialiSezona} exact />
        <Route path="/Login" component={Login} exact />
        <Route path="/aktortefilmit" component={AktortEFilmit} exact />
        <Route
          path="/detajeteaktorittefilmit/:id"
          component={DetajetEAktoritTeFilmit}
          exact
        />
        <Route path="/aktorteserialit" component={AktortESerialit} exact />
        <Route
          path="/detajeteaktoritteserialit/:id"
          component={DetajetEAktoritTeSerialit}
          exact
        />
        <Route
          path="/producentetefilmit"
          component={ProducentetEFilmit}
          exact
        />
        <Route
          path="/detajeteproducentevetefilmit/:id"
          component={DetajetEProducenteveTeFilmit}
          exact
        />
          <Route
          path="/detajetekontaktit/:id"
          component={DetajetEKontaktit}
          exact
        />
       
        <Route
          path="/producenteteserialit"
          component={ProducentetESerialit}
          exact
        />
        <Route
          path="/detajeteproducenteveteserialit/:id"
          component={DetajetEProducenteveTeSerialit}
          exact
        />
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/regjisoretefilmit" component={RegjisoretEFilmit} exact />
        <Route
          path="/detajeteregjisorevetefilmit/:id"
          component={DetajetERegjisoreveTeFilmit}
          exact
        />
        <Route
          path="/detajeteregjisoritteserialit/:id"
          component={DetajetERegjisoritTeSerialit}
          exact
        />
        <Route path="/kategoritefilmit" component={KategoritEFilmit} exact />
        <Route
          path="/kategoriteserialit"
          component={KategoriteESerialit}
          exact
        />
        <Route
          path="/regjisoreteserialit"
          component={RegjisoretESerialit}
          exact
        />
        <Route path="/aktorfilmi" component={AktorFilmi} exact />
        <Route path="/aktorseriali" component={AktorSeriali} exact />
        <Route path="/regjisorseriali" component={RegjisorSeriali} exact />
        <Route path="/regjisorfilmi" component={RegjisorFilmi} exact />
        <Route path="/producentfilmi" component={ProducentFilmi} exact />
        <Route path="/producentseriali" component={ProducentSeriali} exact />
        <Route path="/kategoritfilmit/:id" component={KategoritFilmit} exact />
        <Route
          path="/kategoritserialit/:id"
          component={KategoritSerialit}
          exact
        />
        <Route path="/rrethnesh" component={RrethNesh} exact />
        <Route path="/rrethneshh" component={RrethNeshsh} exact />
        <Route path="/skenaristetefilmit" component={SkenaristetEFilmit} exact />
        <Route path="/skenaristfilmi" component={SkenaristFilmi} exact />
        <Route path="/detajeteskenaristvetefilmit/:id" component={DetajetESkenaristveTeFilmit} exact />
        <Route path="/skenaristseriali" component={SkenaristSeriali} exact />
        <Route path="/detajeteskenaristveteserialit/:id" component={DetajetESkenaristveTeSerialit} exact />
        <Route component={PageNotFound} exact />
      </Switch>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
