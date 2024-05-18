import React from 'react'

const Footer: React.FC = () => {
    return (
        <div className='bg-green-900 p-6 flex justify-around text-white'>
            <div className='flex w-1/4'>
                <p className='text-justify'>
                    کارما بعنوان یکی از ارائه دهنده ها بسته جامع خدمات کاریابی و استخدام، تجربه برگزاری موفق ادوار مختلف نمایشگاه‌های کار شریف و ایران را در کارنامه کاری خود دارد. سیستم هوشمند انطباق، رزومه ساز دو زبانه، تست‌های خودشناسی، ارتقای توانمندی‌ها به کمک پیشنهاد دوره‌های آموزشی و همکاری با معتبرترین سازمان‌ها برای استخدام از ویژگی‌های متمایز کارما است.
                </p>
            </div>
            <div className='flex flex-col w-1/4'>
                <p className='text-justify'>
                    کارما محصولی دانش بنیان شناخته شده است.
                </p>
                <br />
                <p>
                    دارای مجوز رسمی کاریابی الکترونیکی از وزارت کار، تعاون و رفاه اجتماعی
                </p>
            </div>
        </div>
    )
}

export default Footer