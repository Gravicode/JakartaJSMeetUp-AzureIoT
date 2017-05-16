using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

using GIS = GHIElectronics.UWP.Shields;
// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace FezHatBot
{
    public class MobilRemote
    {
        public enum ArahJalan { Maju, Mundur, Kanan, Kiri, Stop }
        public ArahJalan Arah { set; get; }
        public int Kecepatan { set; get; }

        public MobilRemote()
        {
            Kecepatan = 0;
            Arah = ArahJalan.Stop;
        }
    }
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        private GIS.FEZHAT hat;
        private DispatcherTimer timer;
   
        const string MQTT_BROKER_ADDRESS = "cloud.makestro.com";
        static bool isNavigating = false;
        static MqttClient client { set; get; }
        static MobilRemote Mobil { set; get; }
        public MainPage()
        {
            this.InitializeComponent();
            this.Setup();
        }
        private async void Setup()
        {
            this.hat = await GIS.FEZHAT.CreateAsync();
            //this.hat.S1.SetLimits(500, 2400, 0, 180);
            //this.hat.S2.SetLimits(500, 2400, 0, 180);

            this.timer = new DispatcherTimer();
            this.timer.Interval = TimeSpan.FromMilliseconds(100);
        
            this.timer.Start();

            Mobil = new MobilRemote();
            this.timer.Tick += (a,b) =>
            {
                /*
                double x, y, z;

                this.hat.GetAcceleration(out x, out y, out z);

                this.LightTextBox.Text = this.hat.GetLightLevel().ToString("P2");
                this.TempTextBox.Text = this.hat.GetTemperature().ToString("N2");
                this.AccelTextBox.Text = $"({x:N2}, {y:N2}, {z:N2})";
                this.Button18TextBox.Text = this.hat.IsDIO18Pressed().ToString();
                this.Button22TextBox.Text = this.hat.IsDIO22Pressed().ToString();
                this.AnalogTextBox.Text = this.hat.ReadAnalog(GIS.FEZHAT.AnalogPin.Ain1).ToString("N2");
                */
                if (isNavigating) return;
                isNavigating = true;
                this.hat.D2.Color = GIS.FEZHAT.Color.Black;
                this.hat.D3.Color = GIS.FEZHAT.Color.Black;

                switch (Mobil.Arah)
                {
                    case MobilRemote.ArahJalan.Maju:
                        this.hat.MotorA.Speed = 1.0;
                        this.hat.MotorB.Speed = 1.0;
                        this.hat.D2.Color = GIS.FEZHAT.Color.Green;
                        this.hat.D3.Color = GIS.FEZHAT.Color.Green;
                        break;
                    case MobilRemote.ArahJalan.Mundur:
                        this.hat.MotorA.Speed = -1.0;
                        this.hat.MotorB.Speed = -1.0;
                        this.hat.D2.Color = GIS.FEZHAT.Color.Yellow;
                        this.hat.D3.Color = GIS.FEZHAT.Color.Yellow;
                        break;
                    case MobilRemote.ArahJalan.Kiri:
                        this.hat.MotorA.Speed = -0.7;
                        this.hat.MotorB.Speed = 0.7;
                        this.hat.D2.Color = GIS.FEZHAT.Color.Blue;
                        this.hat.D3.Color = GIS.FEZHAT.Color.Blue;
                        break;
                    case MobilRemote.ArahJalan.Kanan:
                        this.hat.MotorB.Speed = -0.7;
                        this.hat.MotorA.Speed = 0.7;
                        this.hat.D2.Color = GIS.FEZHAT.Color.Cyan;
                        this.hat.D3.Color = GIS.FEZHAT.Color.Cyan;
                        break;
                    case MobilRemote.ArahJalan.Stop:
                        this.hat.MotorA.Speed = 0.0;
                        this.hat.MotorB.Speed = 0.0;
                        this.hat.D2.Color = GIS.FEZHAT.Color.Red;
                        this.hat.D3.Color = GIS.FEZHAT.Color.Red;
                        break;
                        
                }
                isNavigating = false;
            };
            timer.Start();
          
            client = new MqttClient(MQTT_BROKER_ADDRESS);
            string clientId = Guid.NewGuid().ToString();
            client.Connect(clientId,"mifmasterz","123qweasd");
            SubscribeMessage();
        }


        #region MQTT
        void SubscribeMessage()
        {
            // register to message received 
            client.MqttMsgPublishReceived += Client_MqttMsgPublishReceived; ;
            client.Subscribe(new string[] { "mifmasterz/robot/control" }, new byte[] { MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE });

        }

        private async void Client_MqttMsgPublishReceived(object sender, MqttMsgPublishEventArgs e)
        {
            await this.Dispatcher.RunAsync(Windows.UI.Core.CoreDispatcherPriority.Normal, () =>
            {

                string Message = new string(Encoding.UTF8.GetChars(e.Message));
                if (Message.IndexOf(":") < 1) return;
                // handle message received 
                TxtLog.Text = "Message Received = " + Message;
                string[] CmdStr = Message.Split(':');
                if (CmdStr[0] == "MOVE")
                {
                    if (Mobil == null) return;
                    var ArahStr = string.Empty;
                    switch (CmdStr[1])
                    {
                        case "F":
                            Mobil.Arah = MobilRemote.ArahJalan.Maju;
                            ArahStr = "Maju";
                            break;
                        case "B":
                            Mobil.Arah = MobilRemote.ArahJalan.Mundur;
                            ArahStr = "Mundur";
                            break;
                        case "L":
                            Mobil.Arah = MobilRemote.ArahJalan.Kiri;
                            ArahStr = "Kiri";
                            break;
                        case "R":
                            Mobil.Arah = MobilRemote.ArahJalan.Kanan;
                            ArahStr = "Kanan";
                            break;
                        case "S":
                            Mobil.Arah = MobilRemote.ArahJalan.Stop;
                            ArahStr = "Stop";
                            break;
                    }

                    TxtLog.Text = "Arah : " + ArahStr;
                    PublishMessage("mifmasterz/robot/data", "Robot Status:" + CmdStr[1]);

                }
                else if (CmdStr[0] == "REQUEST" && CmdStr[1] == "STATUS")
                {
                    PublishMessage("/robot/state", "ONLINE");
                }
            });
        }

        void PublishMessage(string Topic, string Pesan)
        {
            client.Publish(Topic, Encoding.UTF8.GetBytes(Pesan), MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE, false);
        }
        #endregion

    }
}
