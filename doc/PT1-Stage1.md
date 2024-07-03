## PT STAGE 1 PROPOSAL

**Describe what data is stored in the database. (Where is the data from, and what attributes and information would be stored?)**

The primary dataset that is being used for this project is sourced from [here](https://data.illinois.gov/dataset/police-incidents/resource/87baf5a2-eebe-440f-8686-9d80b9a532dd) and [here](https://data.illinois.gov/dataset/police-arrests/resource/ca1dceb3-01f8-4a56-935b-7e3035ff60a4). This contains the crimes from 1988 to present in the city of Urbana-Champaign that include details of the crime as to the time, date, geocode, metadata related to the crime such as crime code, description and crime category, and description of weapons used. It also contains the exact address of where the crime took place. The dataset contains roughly 4.6 million records.

This dataset goes hand in hand with the Los Angeles crimes dataset mentioned in the doc in terms of column specification. Infact, it has more coverage than the dataset. Additionally, we can potentially use the police arrests dataset (second link) which contains 2M records and the highlight of the dataset is that it specifies not only the metadata related to the arrest but also the details of the arrestee.We would ideally store a conjunction of both these datasets in order to maximize the potential of data coverage and the inner workings of the application.

**What are the basic functions of your web application? (What can users of this website do? Which simple and complex features are there?)**	

We are building a crime tracking application localized to the city of Urbana-Champaign as a start which uses the crime data 	The web application behaves in two facets on a high level:The ability to store and view, and manipulate static data (from the data we have gathered)The ability to handle an entire lifecycle of a crime, from reporting to resolution of the crimeEssentially, the users will be able to view the history of crimes in urbana filtered by the crime type, range of dates etc. And they will be able to report a live crime, which would be notified to the bureau and the users nearby. This crime will then be resolved only by the bureau (type of user) and completes its life cycle. This will then be stored in the database and viewed in the recent activities.The simple feature of this application is its ability to view and visualize static data from the database.The complex feature will be to implement geofencing to notify nearby users and also produce a heatmap based on filters created by the user.

**What would be a good creative component (function) that can improve the functionality of your application? (What is something cool that you want to include? How are you planning to achieve it?)**	

In order to make the crime visualization part intuitive and unique, we intend to display a heat map that shows the exact spots on the map where the crime took place. On hovering over a particular heat blinker, the user will be able to see an expanded view of details pertaining to that crime. We plan to integrate Google Maps API and feed the API with the latitude longitude details from the dataset to pinpoint the locations on a maps view.

**Project Title**

Crime Guard

**Project Summary:  It should be a 1-2 paragraph description of what your project is.**

Crime Guard is intended to be a web-based application that helps users track live crimes that are happening in and around their vicinity. CrimeGuard features a collection of a long history of crimes that have occurred in the area over the years. By mapping this vast data coverage on a map and being able to pinpoint the exact location where the specific crime occurred, the people who end up using CrimeGuard are well informed about problematic neighborhoods and suspect pockets of residential areas within the city.In addition to aggregating crimes nearby on a map view, CrimeGuard also allows users to report crimes by themselves via the application. This helps the users to stay up-to-date with the public safety situation in their surroundings.

**Description of an application of your choice. State as clearly as possible what you want to do. What problem do you want to solve, etc.?**		

##### Problem

The current state of crime tracking applications focus on visualizing and crowdsourcing the data. Reporting is done directly to 911 but neighbors or passerby do not know what is happening in that area until later. 911 officials have the ability to monitor and track crime throughout the day as they are being reported. These facilities are not available to the general public

##### What do we do?

CrimeGuard not only visualizes a long history of crimes committed in a creative manner but also monitors, tracks and opens the window for people to view the crime as it is happening. CrimeGuard notifies the nearby users once the crime is being reported with geofencing technology after it notifies the bureau. This is just a start but 
CrimeGuard APIs can ideally be integrated into security systems for automatic reporting, google maps that pushes notifications to the public who are not users of CrimeGuard and moreover, CrimeGuard's applicability extends beyond Champaign; it can be expanded to cover other major cities like Los Angeles and Chicago, leveraging publicly available crime datasets. This broader scope makes it a valuable tool for various communities.

**Usefulness. Explain as clearly as possible why your chosen application is useful.  Make sure to answer the following questions: Are there any similar websites/applications out there?  If so, what are they, and how is yours different?**

CrimeGuard has a secondary application in real estate, house hunting, and resource allocation for law enforcement. By presenting crime data through heatmaps and offering insights into the frequency and severity of crimes in specific areas, it assists both homebuyers in making informed decisions about their prospective neighborhoods and police officials in optimizing resource allocation to areas with higher crime rates. This dual-purpose functionality makes CrimeGuard a valuable asset for enhancing public safety and resource management in urban environments.

Based on our research, there are certain applications on the market that do crime reporting/ tracking. Some of them along with what their product does has been listed below:

- CrimeMapping.com: This website offers crime data from various law enforcement agencies across the United States. Users can search for crime reports by location and date.
SpotCrime: SpotCrime provides a map-based interface that shows reported crimes in different areas. Users can sign up for email alerts and view crime trends.
- NeighborhoodScout: This website offers detailed crime reports, neighborhood analysis, and real estate information. It's useful for those looking to move to a new area and want to understand the safety of the neighborhood.
- CityProtect: CityProtect provides crime data, including recent incidents, trends, and statistics for various cities and neighborhoods.
- CrimeReports: CrimeReports partners with law enforcement agencies to provide real-time crime data to the public. Users can search for incidents by location and type of crime.

Compared to these 5 products, CrimeGuard has an emphasis on live reporting, tracking and monitoring of crimes throughout its lifecycle with the help of user supplied information. Whilst these 5 products focus on static visualization of crime data, CrimeGuard focuses on visualizing the data geographically and we believe this feature will be more user-friendly as compared to conventional crime reporting.

**Realness.  Describe what your data is and where you will get it.**

Source:  [Urbana police incidents](https://data.illinois.gov/dataset/police-incidents/resource/87baf5a2-eebe-440f-8686-9d80b9a532dd) and [Urbana Police Arrests](https://data.illinois.gov/dataset/police-arrests/resource/ca1dceb3-01f8-4a56-935b-7e3035ff60a4). 

This dataset encompasses crimes that have occurred in the city of Urbana-Champaign from 1988 to the present day. It includes comprehensive information about each crime, such as the exact time, date, geographical coordinates (geocode), and metadata like crime code, description, and category. Details regarding the weapons used are also provided, along with the precise address where each crime occurred. In total, this dataset comprises approximately 4.6 million records.It's important to note that this dataset shares similarities in column specifications with the Los Angeles crimes dataset mentioned in the document, but it offers even broader coverage.

Furthermore, there's potential for integration with the police arrests dataset, which contains 2 million records. Notably, the police arrests dataset not only includes metadata related to the arrests but also provides detailed information about the individuals who were arrested.For optimal data coverage and the enhanced functionality of the application, it is recommended to consider storing a combination of these datasets, thereby maximizing the potential insights and capabilities of the application

**Description of the functionality that your website offers. This is where you talk about what the website delivers. Talk about how a user would interact with the application (i.e., things that one could create, delete, update, or search for). Read the requirements for stage 4 to see what other functionalities you want to provide to the users. You should include:**

The application has two facets. One for the users to report the crime data to our application. The other is for the community users to be informed about the live and existing information.
The reporter performs the following operations.
- **CREATE**: Report the live crime incident.
- **DELETE**: Delete misinformed/false crime.

The community user performs the following operations

- **READ**: Filter or search through the map for crime report.
- **UPDATE**: Modify details related to the reported crime.

Every User will have dedicated profile maintained to track their identity. Session management will be in place to record the user's interactions with the application. Moreover, they will have the facility to access the live tracking map to view the crimes reported in their vicinity. Should a user witness a crime, they will have the option to report the specific details related to it right from the webapp. Once a crime is fed into the app, the webapp makes sure that the reported crime is displayed to all the users who are accessing the web app within the vicinity. With notifications, we would be able alerts the users in the nearby area without having them to access the webapp.

Crime Guard will allow the active user to expand any crime reported via the heat map and view additional details related to the crime. This helps in letting the user know about how the crime was carried out and helps them stay vigilant for any impending dangers. With the help of data supported filters, we are giving the user the feature to look for specific crimes in their surrounding as crime patterns tend to vary from neighborhood to neighborhood.

Given the information that is fed into Crime Guard by the users is purely crowd-sourced and prone to human error, we intend to provide an option to the user for updating the details of a crime that they have reported. They will have access to updating all fields.

**A low-fidelity UI mockup: What do you imagine your final application’s interface might look like? A PowerPoint slide or a pencil sketch on a piece of paper works!**

Authentication
![Authentication](wireframes/Authentication.png)

Homepage
![Homepage](wireframes/Homepage.png)

Live Track View
![Homepage](wireframes/LiveTrack.png)

Reporting
![Homepage](wireframes/Reporting.png)

**Project work distribution: Who would be responsible for each of the tasks or subtasks?**

The project will be divided into front and back end:Backend modules and corresponding frontend components:

- Authentication and Authorization - Sujithra
- Live Tracking - Saairam
- Reporting - Anirudh
- Notifications - Krishna
- Dashboard - Krishna

*the team member will complete both the backend and frontend work required for the assigned module*	
