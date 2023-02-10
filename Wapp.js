Const ApiKey = "ENTER YOUR API KEY";

Const Main = Document.GetElementById('Main');
Const Form = Document.GetElementById('Form');
Const Search = Document.GetElementById('Search');
  
Const Url = (City)=> `Https://Api.Openweathermap.Org/Data/2.5/Weather?Q=${City}&Appid=${ApiKey}`;


Async Function GetWeatherByLocation(City){
     
         Const Resp = Await Fetch(Url(City), {
             Origin: "Cros" });
         Const RespData = Await Resp.Json();
     
           AddWeatherToPage(RespData);
          
     }

      Function AddWeatherToPage(Data){
          Const Temp = Ktoc(Data.Main.Temp);

          Const Weather = Document.CreateElement('Div')
          Weather.ClassList.Add('Weather');

          Weather.InnerHTML = `
          <H2><Img Src="Https://Openweathermap.Org/Img/Wn/${Data.Weather[0].Icon}@2x.Png" /> ${Temp}°C <Img Src="Https://Openweathermap.Org/Img/Wn/${Data.Weather[0].Icon}@2x.Png" /></H2>
          <Small>${Data.Weather[0].Main}</Small>
          
          `;


        //   Cleanup 
          Main.InnerHTML= "";
           Main.AppendChild(Weather);
      };


     Function Ktoc(K){
         Return Math.Floor(K - 273.15);
     }



     Form.AddEventListener('Submit',(E) =>{
        E.PreventDefault();

        Const City = Search.Value;

        If(City){
            GetWeatherByLocation(City)
        }

     });


