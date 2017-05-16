using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ProjectOxford.Face;
using Microsoft.ProjectOxford.Face.Contract;
using Microsoft.ProjectOxford.Emotion;
using Microsoft.ProjectOxford.Emotion.Contract;
using Windows.Storage;
using System.IO;
using System.Diagnostics;

namespace SmartAssistant
{
    public class FaceService
    {
       
    
        private readonly IFaceServiceClient faceServiceClient = new FaceServiceClient(APPCONTANTS.FACE_KEY);
        private readonly EmotionServiceClient emotionServiceClient = new EmotionServiceClient(APPCONTANTS.EMOTION_KEY);

        public async Task<FaceRectangle[]> UploadAndDetectFaces(StorageFile imageFile)
        {
            try
            {
                var stream = await imageFile.OpenStreamForReadAsync();
                var faces = await faceServiceClient.DetectAsync(stream);
                
                if (faces == null || faces.Length < 1)
                {
                    return null;
                }
                var faceRects = faces.Select(face => face.FaceRectangle);
                return faceRects.ToArray();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Face[]> UploadAndDetectFaceAttributes(StorageFile imageFile)
        {
            try
            {
                var stream = await imageFile.OpenStreamForReadAsync();
                var faces = await faceServiceClient.DetectAsync(stream,false,false,new FaceAttributeType[] { FaceAttributeType.Age, FaceAttributeType.Gender  });

                if (faces == null || faces.Length < 1)
                {
                    return null;
                }
                return faces;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public string HowOld(Face[] faces)
        {
            try
            {
                if (faces.Count() > 1)
                {
                    return "I see more than 1 faces";
                }
                else if (faces.Count() == 1)
                {
                    var Gender = "he";
                    if (faces[0].FaceAttributes.Gender == "female") Gender = "she";
                    return $"I think {Gender} is {faces[0].FaceAttributes.Age} years old";
                }
                return "I don't see any faces, please look at me";

            }
            catch (Exception)
            {
                return null;
            }
        }


        #region Detect Emotion
        public async Task<string> DetectEmotion(StorageFile imageFile)
        {
           var emotions =  await DetectEmotionFromFile(imageFile);
            foreach (var item in emotions)
            {
                var bestEmotion = item.Scores.ToRankedList().FirstOrDefault().Key;
                if (bestEmotion != nameof(Scores.Neutral))
                    return bestEmotion;
            }
            return null;
        }

        async Task<Emotion[]> DetectEmotionFromFile(StorageFile imageFile)
        {
            WriteLog("Calling EmotionServiceClient.RecognizeAsync()...");
            try
            {
                var stream = await imageFile.OpenStreamForReadAsync();
                Emotion[] emotionResult;

                emotionResult = await emotionServiceClient.RecognizeAsync(stream);
                return emotionResult;
                

            }
            catch (Exception exception)
            {
                WriteLog(exception.ToString());
                return null;
            }
        }
        async Task<Emotion[]> DetectEmotionUrl(string Url)
        {

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
            Debug.WriteLine(Msg);
        }
        #endregion

    }
}
