import React from "react";
import FileUploadExcel from "./FileUploadExcel";

const Hero = ({toggleMobileData}) => {
  return (
    <div className="bg-transparent">
      <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-black dark:text-black sm:text-4xl">
          <span className="block">Gulat ka bb?</span>
          <span className="block text-red-500">surprise ko sayo to</span>
        </h2>
        <p className="text-xl mt-4 max-w-md mx-auto text-black-400">
          I hope this can help you in some way po hehe.
        </p>
        <div className="lg:mt-0 lg:flex-shrink-0">
          <div className="mt-12 iflex rounded-md shadow">
            <FileUploadExcel toggleMobileData={toggleMobileData}/>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
