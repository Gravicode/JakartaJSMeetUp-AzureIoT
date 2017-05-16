using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ProjectOxford.Vision;
using Microsoft.ProjectOxford.Vision.Contract;
using System.IO;
using Windows.UI.Xaml.Controls;
using System.Diagnostics;
using Windows.Storage;

// ----------------------------------------------------------------------
// KEY SAMPLE CODE ENDS HERE 
// ----------------------------------------------------------------------
namespace SmartAssistant
{
    public class ComputerVisionService
    {
       
        VisionServiceClient VisionServiceClient = new VisionServiceClient(APPCONTANTS.COMPUTERVISION_KEY);

        public async Task<byte[]> GetThumbnail(string Url, int width, int height)
        {
            bool useSmartCropping = true;

            //
            // Either upload an image, or supply a url
            //
            byte[] thumbnail;
            thumbnail = await ThumbnailUrl(Url, width, height, useSmartCropping);

            return thumbnail;
        }

        public async Task<string> RecognizeText(StorageFile imageFile)
        {
            var x = await UploadAndRecognizeImage(imageFile, GetSupportedLanguages().Where(y => y.ShortCode == "en").SingleOrDefault().ShortCode);
            return LogOcrResults(x);

        }

        public async void RecognizeTextFromUrlImage(string URLImage)
        {
            var x = await RecognizeUrl(URLImage, GetSupportedLanguages().Where(y => y.ShortCode == "en").SingleOrDefault().ShortCode);
            LogOcrResults(x);

        }
        async void RecognizeImage()
        {
            string URLImage = "https://thumbs.dreamstime.com/z/happy-american-family-1115743.jpg";
            var x = await AnalyzeUrl(URLImage);
            LogAnalysisResult(x);

        }
        public async Task<string> RecognizeImage(StorageFile imageFile)
        {  
            var x = await UploadAndAnalyzeImage(imageFile);
            var result = LogAnalysisResult(x);
            return result;
        }
        protected string LogAnalysisResult(AnalysisResult result)
        {
            string Speak = string.Empty;
            if (result == null)
            {
                Log("null");
                return null;
            }

            if (result.Metadata != null)
            {
                Log("Image Format : " + result.Metadata.Format);
                Log("Image Dimensions : " + result.Metadata.Width + " x " + result.Metadata.Height);
            }

            if (result.ImageType != null)
            {
                string clipArtType;
                switch (result.ImageType.ClipArtType)
                {
                    case 0:
                        clipArtType = "0 Non-clipart";
                        break;
                    case 1:
                        clipArtType = "1 ambiguous";
                        break;
                    case 2:
                        clipArtType = "2 normal-clipart";
                        break;
                    case 3:
                        clipArtType = "3 good-clipart";
                        break;
                    default:
                        clipArtType = "Unknown";
                        break;
                }
                Log("Clip Art Type : " + clipArtType);

                string lineDrawingType;
                switch (result.ImageType.LineDrawingType)
                {
                    case 0:
                        lineDrawingType = "0 Non-LineDrawing";
                        break;
                    case 1:
                        lineDrawingType = "1 LineDrawing";
                        break;
                    default:
                        lineDrawingType = "Unknown";
                        break;
                }
                Log("Line Drawing Type : " + lineDrawingType);
            }


            if (result.Adult != null)
            {
                Log("Is Adult Content : " + result.Adult.IsAdultContent);
                Log("Adult Score : " + result.Adult.AdultScore);
                Log("Is Racy Content : " + result.Adult.IsRacyContent);
                Log("Racy Score : " + result.Adult.RacyScore);
            }

            if (result.Categories != null && result.Categories.Length > 0)
            {
                Log("Categories : ");
                foreach (var category in result.Categories)
                {
                    Log("   Name : " + category.Name + "; Score : " + category.Score);
                }
            }

            if (result.Faces != null && result.Faces.Length > 0)
            {
                Log("Faces : ");
                foreach (var face in result.Faces)
                {
                    Log("   Age : " + face.Age + "; Gender : " + face.Gender);
                }
            }

            if (result.Color != null)
            {
                Log("AccentColor : " + result.Color.AccentColor);
                Log("Dominant Color Background : " + result.Color.DominantColorBackground);
                Log("Dominant Color Foreground : " + result.Color.DominantColorForeground);

                if (result.Color.DominantColors != null && result.Color.DominantColors.Length > 0)
                {
                    string colors = "Dominant Colors : ";
                    foreach (var color in result.Color.DominantColors)
                    {
                        colors += color + " ";
                    }
                    Log(colors);
                }
            }

            if (result.Description != null)
            {
                Log("Description : ");
                foreach (var caption in result.Description.Captions)
                {
                    Log("   Caption : " + caption.Text + "; Confidence : " + caption.Confidence);
                    Speak += caption.Text;
                }
                string tags = "   Tags : ";
                foreach (var tag in result.Description.Tags)
                {
                    tags += tag + ", ";
                }
                Log(tags);

            }

            if (result.Tags != null)
            {
                Log("Tags : ");
                foreach (var tag in result.Tags)
                {
                    Log("   Name : " + tag.Name + "; Confidence : " + tag.Confidence + "; Hint : " + tag.Hint);
                }
            }
            return Speak;
        }


        #region Image Recognition
        private async Task<AnalysisResult> UploadAndAnalyzeImage(StorageFile imageFile)
        {
            var stream = await imageFile.OpenStreamForReadAsync();

         
                Log("Calling VisionServiceClient.AnalyzeImageAsync()...");
                VisualFeature[] visualFeatures = new VisualFeature[] { VisualFeature.Adult, VisualFeature.Categories, VisualFeature.Color, VisualFeature.Description, VisualFeature.Faces, VisualFeature.ImageType, VisualFeature.Tags };
                AnalysisResult analysisResult = await VisionServiceClient.AnalyzeImageAsync(stream, visualFeatures);
                return analysisResult;
            
        }

        private async Task<AnalysisResult> AnalyzeUrl(string imageUrl)
        {
            Log("Calling VisionServiceClient.AnalyzeImageAsync()...");
            VisualFeature[] visualFeatures = new VisualFeature[] { VisualFeature.Adult, VisualFeature.Categories, VisualFeature.Color, VisualFeature.Description, VisualFeature.Faces, VisualFeature.ImageType, VisualFeature.Tags };
            AnalysisResult analysisResult = await VisionServiceClient.AnalyzeImageAsync(imageUrl, visualFeatures);
            return analysisResult;
        }
        #endregion

        #region OCR
        private List<RecognizeLanguage> GetSupportedLanguages()
        {
            return new List<RecognizeLanguage>()
            {
                new RecognizeLanguage(){ ShortCode = "unk",     LongName = "AutoDetect"  },
                new RecognizeLanguage(){ ShortCode = "ar",      LongName = "Arabic"  },
                new RecognizeLanguage(){ ShortCode = "zh-Hans", LongName = "Chinese (Simplified)"  },
                new RecognizeLanguage(){ ShortCode = "zh-Hant", LongName = "Chinese (Traditional)"  },
                new RecognizeLanguage(){ ShortCode = "cs",      LongName = "Czech"  },
                new RecognizeLanguage(){ ShortCode = "da",      LongName = "Danish"  },
                new RecognizeLanguage(){ ShortCode = "nl",      LongName = "Dutch"  },
                new RecognizeLanguage(){ ShortCode = "en",      LongName = "English"  },
                new RecognizeLanguage(){ ShortCode = "fi",      LongName = "Finnish"  },
                new RecognizeLanguage(){ ShortCode = "fr",      LongName = "French"  },
                new RecognizeLanguage(){ ShortCode = "de",      LongName = "German"  },
                new RecognizeLanguage(){ ShortCode = "el",      LongName = "Greek"  },
                new RecognizeLanguage(){ ShortCode = "hu",      LongName = "Hungarian"  },
                new RecognizeLanguage(){ ShortCode = "it",      LongName = "Italian"  },
                new RecognizeLanguage(){ ShortCode = "ja",      LongName = "Japanese"  },
                new RecognizeLanguage(){ ShortCode = "ko",      LongName = "Korean"  },
                new RecognizeLanguage(){ ShortCode = "nb",      LongName = "Norwegian"  },
                new RecognizeLanguage(){ ShortCode = "pl",      LongName = "Polish"  },
                new RecognizeLanguage(){ ShortCode = "pt",      LongName = "Portuguese"  },
                new RecognizeLanguage(){ ShortCode = "ro",      LongName = "Romanian" },
                new RecognizeLanguage(){ ShortCode = "ru",      LongName = "Russian"  },
                new RecognizeLanguage(){ ShortCode = "sr-Cyrl", LongName = "Serbian (Cyrillic)" },
                new RecognizeLanguage(){ ShortCode = "sr-Latn", LongName = "Serbian (Latin)" },
                new RecognizeLanguage(){ ShortCode = "sk",      LongName = "Slovak" },
                new RecognizeLanguage(){ ShortCode = "es",      LongName = "Spanish"  },
                new RecognizeLanguage(){ ShortCode = "sv",      LongName = "Swedish"  },
                new RecognizeLanguage(){ ShortCode = "tr",      LongName = "Turkish"  }
            };
        }
        private async Task<OcrResults> UploadAndRecognizeImage(StorageFile imageFile, string language)
        {
            var stream = await imageFile.OpenStreamForReadAsync();
            Log("Calling VisionServiceClient.RecognizeTextAsync()...");
            OcrResults ocrResult = await VisionServiceClient.RecognizeTextAsync(stream, language);
            return ocrResult;
        }

        /// <summary>
        /// Sends a url to Project Oxford and performs OCR
        /// </summary>
        /// <param name="imageUrl">The url to perform recognition on</param>
        /// <param name="language">The language code to recognize for</param>
        /// <returns></returns>
        private async Task<OcrResults> RecognizeUrl(string imageUrl, string language)
        {
           
            Log("Calling VisionServiceClient.RecognizeTextAsync()...");
            OcrResults ocrResult = await VisionServiceClient.RecognizeTextAsync(imageUrl, language);
            return ocrResult;

            // -----------------------------------------------------------------------
            // KEY SAMPLE CODE ENDS HERE
            // -----------------------------------------------------------------------
        }

        #endregion

        #region Get Thumbnail
        private async Task<byte[]> UploadAndThumbnailImage(string imageFilePath, int width, int height, bool smartCropping)
        {

            using (Stream imageFileStream = File.OpenRead(imageFilePath))
            {
                //
                // Upload an image and generate a thumbnail
                //
                Log("Calling VisionServiceClient.GetThumbnailAsync()...");
                return await VisionServiceClient.GetThumbnailAsync(imageFileStream, width, height, smartCropping);
            }

            // -----------------------------------------------------------------------
            // KEY SAMPLE CODE ENDS HERE
            // -----------------------------------------------------------------------
        }

        /// <summary>
        /// Sends a url to Project Oxford and generates a thumbnail
        /// </summary>
        /// <param name="imageUrl">The url of the image to generate a thumbnail for</param>
        /// <param name="width">Width of the thumbnail. It must be between 1 and 1024. Recommended minimum of 50.</param>
        /// <param name="height">Height of the thumbnail. It must be between 1 and 1024. Recommended minimum of 50.</param>
        /// <param name="smartCropping">Boolean flag for enabling smart cropping.</param>
        /// <returns></returns>
        private async Task<byte[]> ThumbnailUrl(string imageUrl, int width, int height, bool smartCropping)
        {
            //
            // Generate a thumbnail for the given url
            //
            Log("Calling VisionServiceClient.GetThumbnailAsync()...");
            byte[] thumbnail = await VisionServiceClient.GetThumbnailAsync(imageUrl, width, height, smartCropping);
            return thumbnail;

            // -----------------------------------------------------------------------
            // KEY SAMPLE CODE ENDS HERE
            // -----------------------------------------------------------------------
        }

        #endregion

        #region Loggin
        public void Log(string Pesan)
        {
            Debug.WriteLine(Pesan);
        }

        string LogOcrResults(OcrResults results)
        {
            StringBuilder stringBuilder = new StringBuilder();

            if (results != null && results.Regions != null)
            {
                //stringBuilder.Append("Text: ");
                stringBuilder.AppendLine();
                foreach (var item in results.Regions)
                {
                    foreach (var line in item.Lines)
                    {
                        foreach (var word in line.Words)
                        {
                            stringBuilder.Append(word.Text);
                            stringBuilder.Append(" ");
                        }

                        stringBuilder.AppendLine();
                    }

                    stringBuilder.AppendLine();
                }
            }

            Log(stringBuilder.ToString());
            return stringBuilder.ToString();
        }
        #endregion
    }

    public class RecognizeLanguage
    {
        public string ShortCode { get; set; }
        public string LongName { get; set; }
    }
}
