using System;
using System.Security.Cryptography;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using BusinessModel;
using DataAccess;

namespace BusinessLogic
{
    public class SiginLogic : ISigninStatus, ISigninResults
    {
        const int keySize = 64;
        const int iterations = 350000;
        HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;
       
        private readonly ParamSignInDataModels? _signinData;
        private static Random random = new Random((int)DateTime.Now.Ticks);

        public SiginLogic(ParamSignInDataModels signinData)
        {
            _signinData = signinData;
        }


        async public Task<ReturnGetSigninDataModel> GetSigninResults()
        {
            //checked if username exist in database
            ReturnGetSigninDataModel dataAccessData = await GetSigninStatus();
            if (dataAccessData.StatusCodeNumber == 11) { 
                return dataAccessData; 
            }

            //begin build hash password from users input and salt from database
            var saltFromDB = dataAccessData.LoginData.Salt;
            var passwordFromUser = _signinData.IStillLoveYou;

            //convert salt to bytes
            string[] tempArr = saltFromDB.Split('-');
            byte[] saltBytes = new byte[tempArr.Length];
            for (int i = 0; i < tempArr.Length; i++)
            {
                saltBytes[i] = Convert.ToByte(tempArr[i], 16);
            }

            var generateHashPasswordFromUser = HashPasword(_signinData.IStillLoveYou, saltBytes);

            //Compare the 2 hashPasswordString
            if (generateHashPasswordFromUser != dataAccessData.LoginData.HashSaltedIStillLoveYou)
            {
                dataAccessData.StatusCodeNumber = 11;
                return dataAccessData;
            }

            return dataAccessData;
        }

        async public Task<ReturnGetSigninDataModel> GetSigninStatus()
        {
            GetSigninDataAccess dataAccess = new GetSigninDataAccess(_signinData);
            return await dataAccess.GetSigninStatus();
        }

        private string HashPasword(string password, byte[] salt)
        {
            
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                iterations,
                hashAlgorithm,
                keySize);
            return Convert.ToHexString(hash);
        }

    }
}
