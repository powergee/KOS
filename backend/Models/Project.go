package Models

import (
	"fmt"

	"github.com/CSUOS/KOS/backend/Config"

	_ "github.com/go-sql-driver/mysql"
)

// GetAllProjects 모든 프로젝트를 반환
func GetAllProjects(project *[]Project) (err error) {
	if err = Config.DB.Preload("Lists").Preload("Tasks").Find(project).Error; err != nil {
		return err
	}
	return nil
}

// CreateProject 프로젝트를 생성한다.
func CreateProject(project *Project) (err error) {
	if err = Config.DB.Create(project).Error; err != nil {
		return err
	}
	return nil
}

// GetProjectByID 아이디에 매칭되는 프로젝트를 반환
func GetProjectByID(project *Project, id string) (err error) {
	if err = Config.DB.Preload("Lists").Preload("Tasks").Where("id = ?", id).First(project).Error; err != nil {
		return err
	}
	return nil
}

// UpdateProject 아이디에 매칭되는 프로젝트를 업데이트
func UpdateProject(project *Project, id string) (err error) {
	fmt.Println(project)
	Config.DB.Save(project)
	return nil
}

// DeleteProject 아이디에 매칭되는 프로젝트를 삭제
func DeleteProject(project *Project, id string) (err error) {
	Config.DB.Select("Lists").Where("id = ?", id).Delete(project)
	return nil
}
