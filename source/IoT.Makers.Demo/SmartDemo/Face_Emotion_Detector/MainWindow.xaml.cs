using Microsoft.ProjectOxford.Face;
using Microsoft.ProjectOxford.Face.Contract;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

using Microsoft.ProjectOxford.Emotion;
using Microsoft.ProjectOxford.Emotion.Contract;

namespace Face_Emotion_Detector
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        const string EmoKey = "356c0ac7e05c43e2a755b46627d4501d";
        const string FaceKey = "f485c0148bcc484ba6537a209d154b77";
        private readonly IFaceServiceClient faceServiceClient = new FaceServiceClient(FaceKey);

        public MainWindow()
        {
            InitializeComponent();
            
        }
        private async void BrowseButton_Click(object sender, RoutedEventArgs e)
        {
            var openDlg = new Microsoft.Win32.OpenFileDialog();

            openDlg.Filter = "JPEG Image(*.jpg)|*.jpg";
            bool? result = openDlg.ShowDialog(this);

            if (!(bool)result)
            {
                return;
            }

            string filePath = openDlg.FileName;

            Uri fileUri = new Uri(filePath);
            BitmapImage bitmapSource = new BitmapImage();

            bitmapSource.BeginInit();
            bitmapSource.CacheOption = BitmapCacheOption.None;
            bitmapSource.UriSource = fileUri;
            bitmapSource.EndInit();

            FacePhoto.Source = bitmapSource;

            Title = "Detecting...";
            FaceRectangle[] faceRects = await UploadAndDetectFaces(filePath);
            Title = String.Format("Detection Finished. {0} face(s) detected", faceRects.Length);

            if (faceRects.Length > 0)
            {
                DrawingVisual visual = new DrawingVisual();
                DrawingContext drawingContext = visual.RenderOpen();
                drawingContext.DrawImage(bitmapSource,
                    new Rect(0, 0, bitmapSource.Width, bitmapSource.Height));
                double dpi = bitmapSource.DpiX;
                double resizeFactor = 96 / dpi;

                foreach (var faceRect in faceRects)
                {
                    drawingContext.DrawRectangle(
                        Brushes.Transparent,
                        new Pen(Brushes.Red, 2),
                        new Rect(
                            faceRect.Left * resizeFactor,
                            faceRect.Top * resizeFactor,
                            faceRect.Width * resizeFactor,
                            faceRect.Height * resizeFactor
                            )
                    );
                }

                drawingContext.Close();
                RenderTargetBitmap faceWithRectBitmap = new RenderTargetBitmap(
                    (int)(bitmapSource.PixelWidth * resizeFactor),
                    (int)(bitmapSource.PixelHeight * resizeFactor),
                    96,
                    96,
                    PixelFormats.Pbgra32);

                faceWithRectBitmap.Render(visual);
                FacePhoto.Source = faceWithRectBitmap;
            }
            
            var Emotions = await DetectEmotionFromFile(filePath);
            foreach(Emotion item in Emotions)
            {
                var Ranks = item.Scores.ToRankedList();
                WriteLog(item.FaceRectangle.Left + ", " + item.FaceRectangle.Top);
                foreach(var rank in Ranks)
                {
                    WriteLog(rank.Key + " : " + rank.Value);
                }
                WriteLog("-------------------");
            }
        }
        private async Task<FaceRectangle[]> UploadAndDetectFaces(string imageFilePath)
        {
            try
            {
                using (Stream imageFileStream = File.OpenRead(imageFilePath))
                {
                    var faces = await faceServiceClient.DetectAsync(imageFileStream);
                    var faceRects = faces.Select(face => face.FaceRectangle);
                    return faceRects.ToArray();
                }
            }
            catch (Exception)
            {
                return new FaceRectangle[0];
            }
        }
        
        #region Detect Emotion
        async Task<Emotion[]> DetectEmotionFromFile(string imageFilePath)
        {

            EmotionServiceClient emotionServiceClient = new EmotionServiceClient(EmoKey);

            WriteLog("Calling EmotionServiceClient.RecognizeAsync()...");
            try
            {
                Emotion[] emotionResult;
                using (Stream imageFileStream = File.OpenRead(imageFilePath))
                {
                    //
                    // Detect the emotions in the URL
                    //
                    emotionResult = await emotionServiceClient.RecognizeAsync(imageFileStream);
                    return emotionResult;
                }
            }
            catch (Exception exception)
            {
                WriteLog(exception.ToString());
                return null;
            }
        }
        async Task<Emotion[]> DetectEmotionUrl(string Url)
        {
            WriteLog("EmotionServiceClient is created");

            //
            // Create Project Oxford Emotion API Service client
            //
            EmotionServiceClient emotionServiceClient = new EmotionServiceClient(EmoKey);

            WriteLog("Calling EmotionServiceClient.RecognizeAsync()...");
            try
            {
                //
                // Detect the emotions in the URL
                //
                Emotion[] emotionResult = await emotionServiceClient.RecognizeAsync(Url);
                return emotionResult;
            }
            catch (Exception exception)
            {
                WriteLog("Detection failed. Please make sure that you have the right subscription key and proper URL to detect.");
                WriteLog(exception.ToString());
                return null;
            }
        }

        void WriteLog(string Msg)
        {
            TxtLog.AppendText(Msg);
            TxtLog.AppendText(Environment.NewLine);
        }
        #endregion
        
    }
}
